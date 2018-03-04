import workflowFactory from "./workflowFactory";

class WorkflowService {
    getWorkflow(workflowId){
        return workflowFactory.getWorkflow(workflowId);
    }
}

export default new WorkflowService();