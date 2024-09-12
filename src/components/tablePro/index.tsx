import { Component, Prop, Vue } from 'vue-property-decorator'
import styles from './index.module.less'
import type { VNode } from 'vue'
import { TtemConfigs } from './item'

export interface iTablePro {
	data: any[]
	loading: boolean
	itemConfigs: TtemConfigs[]
	visibleArea: {
		width: number
		height: number
		start: number
		end: number
		scrollTop: number
		count: number
	}
	scrollHeight: number
	scrollWidth: {
		x: number
		y: number
	}
	initItem: (res: VNode[], server: iTablePro) => void
	created: (vue: Vue) => void
	mounted: (vue: Vue) => void
	onscroll: (e: Event) => void
}

@Component
export default class TablePro extends Vue {
	$props!: {
		server: iTablePro
	}

	@Prop() readonly server!: iTablePro

	created() {
		this.server.created(this)
		const slotsDefault = this.$slots.default || []
		this.server.initItem(slotsDefault, this.server)
	}

	mounted() {
		this.server.mounted(this)
	}

	protected render() {
		const { data, visibleArea, loading, scrollHeight, scrollWidth } = this.server
		const renderData = data.slice(visibleArea.start, visibleArea.end)
		return (
			<div class={styles.tablePro} ref="tablePro">
				{loading ? (
					<div class={styles.tableProWrap}>
						<div class={styles.tableHead}>
							<table class={[styles.table, styles.tableHeadTable]}>
								<colgroup>
									{this.server.itemConfigs.map((v, i) => {
										return <col width={v.width || '100'} key={i} />
									})}
									<col width={scrollWidth.x} />
								</colgroup>
								<thead class={styles.tableProThead}>
									<tr>
										{this.server.itemConfigs.map((v, i) => {
											return (
												<th
													key={i}
													colspan="1"
													class={[styles.tableProTh, styles.tableProColumns, styles.headTh]}
												>
													{v.label}
												</th>
											)
										})}
										<th class={[styles.tableProTh, styles.tableProColumns, styles.headTh]} style="width: 8px;"></th>
									</tr>
								</thead>
							</table>
						</div>
						<div
							class={styles.tableContent}
							ref="tableContent"
							onScroll={(e) => this.server.onscroll(e)}
						>
							<div style={{ width: 0, height: scrollHeight + 'px', float: 'left' }}></div>
							{loading ? (
								<table class={[styles.table, styles.tableMainTable]} style={{ marginTop: `${visibleArea.scrollTop}px` }}>
									<colgroup>
										{this.server.itemConfigs.map((v, i) => {
											return <col key={i} width={v.width || '100'} />
										})}
									</colgroup>
									<tbody>
										{renderData.map((n, m) => {
											return (
												<tr
													key={m}
													class={styles.tableProBodyTr}
													id={`tbodyTr_${visibleArea.start + m}`}
													ref={`tbodyTr_${visibleArea.start + m}`}
												>
													{this.$slots.default?.map((v, i) => {
														const prop = v.data?.attrs?.prop
														// @ts-ignore
														v.componentOptions!.propsData!.itemData = n[prop]
														return (
															<td
																key={`${m}-${i}`}
																class={styles.tableProColumns}
															>
																<div class={styles.cell}>{n[prop]}</div>
															</td>
														)
													})}
												</tr>
											)
										})}
									</tbody>
								</table>
							) : null}
						</div>
					</div>
				) : null}
			</div>
		)
	}
}
