import {Component} from "react";
import PropTypes from "prop-types";

export default class Control extends Component {
    constructor(props) {
        super(props);

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
        workflowForm.connect(this, this.props.name);
    }

    componentWillUnmount() {
        const {workflowForm} = this.context;
        workflowForm.disconnect(this, this.props.name);
    }

    handleChange(event) {
        const {workflowForm} = this.context;
        event.persist();

        workflowForm.handleChange(event, this.props.name);
    }

    handleBlur() {
        const {workflowForm} = this.context;
        workflowForm.handleBlur(this.props.name);
    }

    render() {
        const {workflowForm} = this.context;
        let suppliedAndGeneratedProps = workflowForm.getProps(this.props.name);

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