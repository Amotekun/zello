import { Actions, ActivityLog } from "@/types";

export const logMessage = (activity: ActivityLog) => {
    const {action, entity_title, entity_type} = activity;

    switch (action) {
        case Actions.CREATE:
            return `created ${entity_type.toLowerCase()} "${entity_title}"`;
        
        case Actions.UPDATE:
            return `updated ${entity_type.toLowerCase()} "${entity_title}"`;

        case Actions.DELETE:
            return `deleted ${entity_type.toLowerCase()} "${entity_title}"`;
        
        default:
            return `unknown action ${action}`;
    }
};