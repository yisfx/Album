import React from "react";
import { Provider } from 'mobx-react';


export function MobxIsomorphic(State: any): <T extends React.ComponentClass>(Comp: T) => T {
    debugger
    let isomorphicState;
    if (!!State)
        isomorphicState = {}//(<any>window).__reactData__;
    else isomorphicState = new State();

    let props: any = { store: isomorphicState };

    return (Comp: any): any => {
        class IsomorphicComponent extends Comp {
            render() {
                return React.createElement(
                    Provider,
                    props,
                    React.createElement(Comp, this.props)
                )
            }
        }

        return IsomorphicComponent;
    }
}