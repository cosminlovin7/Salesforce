public with sharing class CertificationGetter {
    public CertificationGetter() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getCertifications(Id attendeeId){
        try {
            Attendee__c currentAttendee = [SELECT Name FROM Attendee__c WHERE Id = :attendeeId].get(0);
            List<Certification__c> certifications = new List<Certification__c>();

            certifications = [SELECT Badge__c FROM Certification__c WHERE Granted_to__c = :currentAttendee.Name];

            return certifications;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static Boolean dispCertif(Id attendeeId) {
        Attendee__c currentAttendee = [SELECT Name FROM Attendee__c WHERE Id = :attendeeId].get(0);
        Integer numberOfCertifications = [SELECT count() FROM Certification__c WHERE Granted_to__c = :currentAttendee.Name];

        if (numberOfCertifications > 0) {
            return true;
        }

        return false;
    }
}
