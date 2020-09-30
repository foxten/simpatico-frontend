export const grabbingAlerts = (alerts) =>{
    return {
        type: 'GRABBING_ALERTS',
        alerts: alerts
    }
}

export const deleteAlert = (alertId)=>{
    return {
        type: 'DELETE_ALERT',
        alertId
    }
}   