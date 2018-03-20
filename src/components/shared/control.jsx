import React, {Component} from "react";
import PropTypes from "prop-types";
import Guid from "guid";
import omit from "object.omit";

export default class Control extends Component {
    constructor(props) {
        super(props);

        this.id = Guid.raw();

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    static contextTypes = {
        connect: PropTypes.func.isRequired,
        disconnect: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
        getProps: PropTypes.func.isRequired
    };

    static propTypes = {
        render: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.context.connect(this, this.id);
    }

    componentWillUnmount() {
        this.context.disconnect(this, this.id);
    }

    handleChange(event) {
        event.persist();

        this.context.handleChange(event, this.id);
    }

    handleBlur() {
        this.context.handleBlur(this.id);
    }

    render() {
        let suppliedAndGeneratedProps = this.context.getProps(this.id);

        if (!suppliedAndGeneratedProps) {
            return null;
        }

        suppliedAndGeneratedProps = omit({
          ...suppliedAndGeneratedProps,
          onChange: this.handleChange,
          onBlur: this.handleBlur
        }, ["render", "validations"]);
        return this.props.render(suppliedAndGeneratedProps);
    }
}