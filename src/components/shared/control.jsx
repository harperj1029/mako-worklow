import {Component} from "react";
import PropTypes from "prop-types";
import Guid from "guid";

export default class Control extends Component {
    constructor(props) {
        super(props);

        this.id = Guid.raw();

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    static contextTypes = {
        workflowForm: PropTypes.object.isRequired
    };

    static propTypes = {
        render: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {workflowForm} = this.context;
        workflowForm.connect(this, this.id);
    }

    componentWillUnmount() {
        const {workflowForm} = this.context;
        workflowForm.disconnect(this, this.id);
    }

    handleChange(event) {
        const {workflowForm} = this.context;
        event.persist();

        workflowForm.handleChange(event, this.id);
    }

    handleBlur() {
        const {workflowForm} = this.context;
        workflowForm.handleBlur(this.id);
    }

    render() {
        const {workflowForm} = this.context;
        let suppliedAndGeneratedProps = workflowForm.getProps(this.id);

        if (!suppliedAndGeneratedProps) {
            return null;
        }

        suppliedAndGeneratedProps = {
          ...suppliedAndGeneratedProps,
          onChange: this.handleChange,
          onBlur: this.handleBlur
        };
        return this.props.render(suppliedAndGeneratedProps);
    }
}