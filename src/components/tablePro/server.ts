import type { VNode } from 'vue'
import { Service } from 'ioc-di'
import { iTablePro } from '.'
import { TtemConfigs } from './item'

interface TableProOptions {
	data: any[]
	/**
	 * 滚动条宽度
	 * 在修改滚动条宽度时，需要传入而且必须传入
	 * @default { x: 8, y: 8 }
	 */
	scrollWidth?: {
		x?: number
		y?: number
	}
}

interface TempData {
	height: number
	top: number
}

@Service()
export default class TableProServer implements iTablePro {

	vue!: Vue

	data: any[] = []

	tempData: TempData[] = []

	loading: boolean = false

	// 表格每一列的宽度
	dataWidth: number[] = []
	// 表格最小高度
	dataMinHeight: number = 48

	lastTime: number = 0

	// 表格可视区域
	visibleArea = {
		// 可视区域宽度
		width: 0,
		// 可视区域高度
		height: 0,
		// 数据开始位置
		start: 0,
		// 数据结束位置
		end: 0,
		// 当前滚动距离
		scrollTop: 0,
		// 可视区域最多显示多少个
		count: 0,
	}

	// 表格列配置
	itemConfigs: TtemConfigs[] = []

	// 表格滚动高度
	scrollHeight: number = 0

	scrollWidth = {
		x: 8,
		y: 8,
	}

	// 上次滚动距离
	private scrollTop = 0

	// 初始渲染时格外的渲染数量，只是用作虚拟滚动更丝滑
	private verticalOffset = 2

	constructor(options: TableProOptions) {
		this.data = options.data || []
		if (this.data.length > 0) {
			this.tempData = this.data.map((v, i) => ({
				height: this.dataMinHeight,
				top: this.dataMinHeight * i
			}))
		}
		Object.assign(this.scrollWidth, options.scrollWidth)
	}

	created(vue: Vue) {
		this.vue = vue
	}

	mounted(vue: Vue) {
		this.calculateTableLayout(vue)
	}

	/**
	 * 初始化列信息
	 *
	 * @param vNode item的虚拟节点
	 * @param server
	 */
	initItem(vNode: VNode[], server: iTablePro) {
		const itemConfigs: TtemConfigs[] = []
		vNode.forEach(v => {
			// @ts-ignore
			v.componentOptions.propsData.server = server
			itemConfigs.push(v.data?.attrs as TtemConfigs)
		})
		this.itemConfigs = itemConfigs
		// tablePro
	}

	// 计算table布局
	calculateTableLayout(vue: Vue) {
		this.calculateColumnWidth(vue)
		this.loading = true
		vue.$nextTick(() => {
			this.getTableLayout(vue);
			this.calculateVerticalScrolling(vue)
		})
	}

	// 计算列宽
	calculateColumnWidth(vue: Vue) {
		const tablePro = vue.$refs['tablePro'] as HTMLElement
		let itemWidthCount = 0
		let undistributedCount = 0
		this.itemConfigs.forEach(item => {
			if (item.width) {
				itemWidthCount += Number(item.width)
			} else {
				undistributedCount += 1
			}
		})
		const widthDiff = itemWidthCount - tablePro.clientWidth
		if (widthDiff < 0) {
			const undistributedWidth = (widthDiff * -1 - this.scrollWidth.x) / undistributedCount
			this.itemConfigs.forEach(item => {
				if (!item.width) {
					item.width = String(undistributedWidth)
				}
			})
		}
	}

	// 获取表格布局
	getTableLayout(vue: Vue) {
		const tablePro = vue.$refs['tableContent'] as HTMLElement
		this.visibleArea.height = tablePro.clientHeight
		this.visibleArea.width = tablePro.clientWidth
	}

	// 计算横向滚动
	calculateHorizontalScrolling(vue: Vue) {

	}

	// 计算纵向滚动
	calculateVerticalScrolling(vue: Vue) {
		const tablePro = vue.$refs['tableContent'] as HTMLElement
		this.scrollHeight = this.data.length * this.dataMinHeight
		const end = tablePro.clientHeight / this.dataMinHeight
		if (end > parseInt(String(end))) {
			this.visibleArea.end = parseInt(String(end)) + this.verticalOffset
		} else {
			this.visibleArea.end = end + this.verticalOffset
		}
		if (this.visibleArea.count === 0) {
			this.visibleArea.count = this.visibleArea.end + this.verticalOffset
		}
		this.calculateCurrentItemHeight();
	}

	/** 计算真实div高度 */
	calculateCurrentItemHeight(): Promise<number> {
		return new Promise((resolve) => {
			this.vue.$nextTick(() => {
				const { start, end } = this.visibleArea
				const renderData = this.data.slice(start, end)
				let addValue = 0
				renderData.forEach((v, i) => {
					const index = start + i
					const dom = this.vue.$refs[`tbodyTr_${index}`] as Element
					if (this.tempData[index].height !== dom.clientHeight) {
						const diffHeight = dom.clientHeight - this.tempData[index].height
						this.tempData[index].height = dom.clientHeight
						this.scrollHeight += diffHeight
						addValue += diffHeight
					}
				})
				resolve(addValue);
			})
		})
	}

	async onscroll(e: Event) {
		const target = e.target as HTMLElement
		const scrollTop = target.scrollTop
		const top = this.visibleArea.height + scrollTop
		if (top <= this.scrollHeight) {
			const diffTop = scrollTop - this.tempData[this.visibleArea.start].height
			await this.calculateCurrentItemHeight();
			if (scrollTop > this.scrollTop) {
				this.updateLocationInformation(diffTop, true)
			} else {
				this.updateLocationInformation(diffTop, false)
			}
			this.scrollTop = scrollTop
		}
	}

	// 更新当前滚动后的起始位置和top值
	updateLocationInformation(diffTop: number, comparison: boolean) {
		const newStart = this.accumulatedStartingPosition(diffTop, comparison)
		if (this.visibleArea.start !== newStart) {
			let total = this.tempData.slice(0, newStart).reduce((accumulator, currentObject) => {
				return accumulator + currentObject.height;
			}, 0);
			this.visibleArea.scrollTop = total
			this.visibleArea.start = newStart
			this.visibleArea.end = this.visibleArea.start + this.visibleArea.count
		}
	}

	/** 从0开始累加到起始位置，如果比diffTop小那么就把起始位置+1直到比diffTop大 */
	accumulatedStartingPosition(diffTop: number, comparison: boolean) {
		const { start, end } = this.visibleArea
		let total = this.tempData.slice(0, start).reduce((accumulator, currentObject) => {
			return accumulator + currentObject.height;
		}, 0);
		if (comparison) {
			let newStart = start;
			while (total < diffTop) {
				newStart++;
				total += this.tempData[newStart].height;
			}
			return newStart
		} else {
			if (total > diffTop) {
				let newStart = start;
				while (total > diffTop && newStart > 0) {
					newStart--;
					total -= this.tempData[newStart].height;
				}
				return newStart
			}
		}
		return start
	}

}

