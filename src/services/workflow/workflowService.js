import workflowFactory from "./workflowFactory";

class WorkflowService {
    async getWorkflow(workflowId){
        return workflowFactory.getWorkflow(workflowId);
    }
}

export default new WorkflowService();