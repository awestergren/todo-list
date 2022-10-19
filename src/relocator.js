import { createElement as e } from "react";
export default class Relocator {
    #component;
    #props;
    constructor(component) {
        this.#component = component;
        this.Component = this.Component.bind(this);
    }

    PropsProvider(props) {
        this.#props = props;
        return null;
    }

    Component(props) {
        return e(this.#component, this.#props, props.children);
    }
}

