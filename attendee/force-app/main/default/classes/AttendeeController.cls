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

    @AuraEnabled(cacheable=true)
    public static Id[] getLeaderboards() {
        try {
            Id[] att_lead = new Id[3];
            Integer[] crtf_lead = new Integer[3];
            for (Integer i = 0; i < 3; i++) {
                crtf_lead[i] = 0;
            }
            List<Certification__c> certificationList = [SELECT Id, 	Attendee__c FROM Certification__c];
            Map<Id, Integer> certifications = new Map<Id, Integer>();
            
            for (Certification__c certification : certificationList) {
                Integer numberOfCertifications = 1;

                if (certifications.containsKey(certification.Attendee__c)) {
                    Integer test = certifications.get(certification.Attendee__c);
                    test += 1;
                    numberOfCertifications = certifications.get(certification.Attendee__c);
                } else {
                    certifications.put(certification.Attendee__c, 1);
                }

                if (numberOfCertifications > crtf_lead[2] && numberOfCertifications <= crtf_lead[1]) {
                    crtf_lead[2] = numberOfCertifications;
                    att_lead[2] = certification.Attendee__c;
                } else if (numberOfCertifications > crtf_lead[1] && numberOfCertifications <= crtf_lead[0]) {
                    crtf_lead[2] = crtf_lead[1];
                    crtf_lead[1] = numberOfCertifications;
                    att_lead[2] = att_lead[1];
                    att_lead[1] = certification.Attendee__c;
                } else if (numberOfCertifications > crtf_lead[0]) {
                    crtf_lead[2] = crtf_lead[1];
                    crtf_lead[1] = crtf_lead[0];
                    crtf_lead[0] = numberOfCertifications;
                    att_lead[2] = att_lead[1];
                    att_lead[1] = att_lead[0];
                    att_lead[0] = certification.Attendee__c;
                }
            }

            System.debug(att_lead);
            System.debug(crtf_lead);

            return att_lead;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static String getPhotoUrl(Id attendeeId) {
        try {
            Attendee__c currentAttendee = [SELECT Id, UserId__c, UserId__r.MediumPhotoUrl, Profile_picture__c FROM Attendee__c Where Id = :attendeeId LIMIT 1];
            if (currentAttendee.UserId__c == null) {
                return currentAttendee.Profile_picture__c;
            } else {
                return currentAttendee.UserId__r.MediumPhotoUrl;
            }
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
