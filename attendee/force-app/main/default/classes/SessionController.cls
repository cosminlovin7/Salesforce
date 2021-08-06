public with sharing class SessionController {
    public SessionController() {

    }

    @AuraEnabled(cacheable=true) 
    public static Map<Id, String> getAvailableSessions() {
        Map<Id, String> sessionsMap = new Map<Id, String>();
        List<Session__c> sessionsList = new List<Session__c>();
        sessionsList = [SELECT Id, Name FROM Session__c WHERE Status__c = 'Open for Registration'];

        if (sessionsList.size() > 0) {
            sessionsMap.put(null, 'Select a session');
            for (Session__c session : sessionsList) {
                sessionsMap.put(session.Id, session.Name);
            }
        } else {
            sessionsMap.put(null, 'No available session');
        }

        return sessionsMap;
    }

    @AuraEnabled()
    public static void submitChange(Id attendeeId, Id sessionId) {
        if (attendeeId == null || sessionId == null) {
            throw new AuraHandledException('Input data is not correct.');
        }

        Attendee__c currentAttendee = [SELECT
                                       Id, Name
                                       FROM Attendee__c WHERE Id = :attendeeId LIMIT 1].get(0);
        
        currentAttendee.Session__c = sessionId;
        update currentAttendee;
    }

    @AuraEnabled()
    public static void abortSession(Id attendeeId) {
        if (attendeeId == null) {
            throw new AuraHandledException('Input data is not corrent.');
        }

        Attendee__c currentAttendee = [SELECT
                                       Id, Name
                                       FROM Attendee__c WHERE Id = :attendeeId LIMIT 1].get(0);

        currentAttendee.Session__c = null;
        update currentAttendee;
    }

    @AuraEnabled(cacheable=true) 
    public static Boolean dispSessionChanger(Id attendeeId) {
        Attendee__c currentAttendee = [SELECT
                                       Id, 
                                       Session__r.Status__c 
                                       FROM Attendee__c WHERE Id = :attendeeId LIMIT 1].get(0);
    
        System.debug(currentAttendee.Session__r.Status__c);                               

        if (currentAttendee.Session__r.Status__c == 'Completed') {
            return true;
        }

        return false;
    }
}
