import Container from "../container";
import DiContainer from '../container';
export default class InstanceMeta {
    private instance;
    static map: WeakMap<Object, InstanceMeta>;
    static Init(instance: Object, prototype: Object): void;
    static Get(instance: Object): InstanceMeta | undefined;
    static Get(instance: Object, create: true): InstanceMeta;
    static GetContainer(instance: Object): Container | undefined;
    private constructor();
    private injections;
    private addInjections;
    private isInit;
    private isBind;
    private container?;
    bindContainer(container: Container): this;
    private children;
    concat(child: InstanceMeta): void;
    private beforeCallback;
    beforeInit(callback: (container: DiContainer) => void): void;
    init(targetContainer: Container, start?: boolean): void;
    private readyCallback;
    onReady(callback: (container: DiContainer) => void): void;
    private afterInit;
    private afterReadyCallback;
    afterReady(callback: () => void): void;
    private destroys;
    addDestroyKeys(prototype: Object): void;
    private isDestroyed;
    destroy(): void;
}
