public with sharing class AttendeeController {
    public AttendeeController() {

    }

    @AuraEnabled(cacheable=true)
    public static Attendee__c getAttendee(Id attendeeId){
        try {
            Attendee__c currentAttendee = [SELECT
                    Name,
                    Birthdate__c,
                    CNP__c,
                    Email__c
                    FROM Attendee__c WHERE Id = :attendeeId].get(0);
            
            return currentAttendee;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
