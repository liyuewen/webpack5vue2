import Vue, { VNode } from 'vue'

declare global {
	namespace JSX {
		type Element = any
		interface ElementAttributesProperty {
			$props: any
		}
		interface IntrinsicAttributes {
			on?: any
			vModel?: any
			vShow?: boolean
			value?: any
			// scopedSlots?: any;
			onInput?: (event: MouseEvent) => void
			onchange?: (event: MouseEvent) => void
			nativeOnClick?: (event: MouseEvent) => void
			oncontextmenu?: (event: MouseEvent) => void
			onmouseup?: (event: MouseEvent) => void
			ondblclick?: (event: MouseEvent) => void
			onmousedown?: (event: MouseEvent) => void
			onmousewheel?: (event: MouseEvent) => void
			onclick?: (event: MouseEvent) => void
			onclick_prevent?: (event: MouseEvent) => void
			onkeyup?: (event: KeyboardEvent) => void
			onDragover?: (event: DragEvent) => void
			onDrop?: (event: DragEvent) => void
			ref?: string
			key?: string | number
			class?: string | string[]
			slot?: string
			style?: Partial<CSSStyleDeclaration> | string | object | object[]
		}
		interface IntrinsicElements {
			[elem: string]: {
				[key: string]: any
			}
		}
	}
}
