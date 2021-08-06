public with sharing class ContactsGetter {
    public ContactsGetter() {

    }
    @AuraEnabled(cacheable = true)
    public static Map<Id, String> getContacts() {
        Map<Id, String> contacts = new Map<Id, String>();
        List<Contact> contactList = new List<Contact>();
        contactList = [SELECT 
                       Id, FirstName, LastName
                       FROM Contact];

        if (contactList.size() > 0) {
            contacts.put(null, 'Select a contact');

            for (Contact contact : contactList) {
                contacts.put(contact.Id, contact.FirstName + ' ' + contact.LastName);
            }
        } else {
            contacts.put(null, 'No available contacts');
        }

        return contacts;
    }

    @AuraEnabled()
    public static void submitChange(Id contactId, String firstName) {
        if (contactId == null || firstName == null) {
            throw new AuraHandledException('Input data is not correct.');
        }

        List<Contact> contact = [SELECT
                                 Id, FirstName
                                 FROM Contact WHERE Id = :contactId LIMIT 1];
        contact.get(0).FirstName = firstName;
        
        update contact;
    }

    @AuraEnabled(cacheable = true)
    public static Boolean dispContacts() {
        Integer numberOfContacts = [SELECT count() FROM Contact];

        if (numberOfContacts > 20) {
            return true;
        }

        return false;
    }

    @AuraEnabled(cacheable = true)
    public static List<Contact> getCList() {
        return [SELECT Id, 
                       FirstName, 
                       LastName, 
                       Email,
                       Birthdate FROM Contact];
    }
}
