import React, {Component} from "react";
import PropTypes from "prop-types";
import Guid from "guid";

export default function control (WrappedControl) {

    return class extends Component {
        constructor(props){
            super(props);

            this.id = Guid.raw();

            this.handleChange = this.handleChange.bind(this);
        }

        static displayName = `Control(${WrappedControl.name})`;

        static contextTypes = {
            connect: PropTypes.func.isRequired,
            disconnect: PropTypes.func.isRequired,
            handleChange: PropTypes.func.isRequired,
            getProps: PropTypes.func.isRequired
        };

        componentDidMount() {
            this.context.connect(this, this.id);
        }

        componentWillUnmount() {
            this.context.disconnect(this, this.id);
        }

        handleChange(event){
            event.persist();

            this.context.handleChange(event, this.id);
        }

        handleBlur(){
            this.context.handleBlur(this.id);
        }

        render() {
            const props = this.context.getProps(this.id);

            if (!props) {
                return null;
            }

            return <WrappedControl {...props} onChange={this.handleChange} />
        }
    }
}