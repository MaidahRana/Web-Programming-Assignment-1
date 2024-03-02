document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
       // Validate Contact Information
       const PhoneNumber = document.getElementById('PhoneNumber').value;
       const ReferenceContact = document.getElementById('ReferenceContact').value;
       const EmailAddress = document.getElementById('EmailAddress').value;
         
       if (!validatePhoneNumber(PhoneNumber) || !validateEmailAddress(EmailAddress)) {
          alert('Invalid Contact Information. Please enter valid phone number and email address.');
          event.preventDefault();
          return;
       }
       if (!validatePhoneNumber(ReferenceContact)) {
         alert('Invalid Reference Contact Information.Please enter valid reference contact number');
         event.preventDefault();
         return;
      }

       // Validate Upload Resume
       const Resume = document.getElementById('Resume').value;
       if (!validateFileExtension(Resume, ['pdf', 'doc', 'docx'])) {
          alert('Invalid Resume File. Please upload a PDF or Word document.');
          event.preventDefault();
          return;
       }

       // Validate Graduation Year
       const GraduationYear = document.getElementById('GraduationYear').value;
       if (!validateGraduationYear(GraduationYear)) {
          alert('Invalid Graduation Year. Please enter a valid year.');
          event.preventDefault();
          return;
       }

 

       // Validate Willingness to Relocate
       const Relocate = document.getElementById('Relocate').value;
       if (!validateWillingnessToRelocate(Relocate)) {
          alert('Invalid Willingness to Relocate. Please select Yes or No.');
          event.preventDefault();
          return;
       }
       const EmploymentDate = document.getElementById('EmploymentDate').value;
       if (!validateDateIsBeforeToday(EmploymentDate)) {
          alert('Invalid Employment Date. Please enter a date before today.');
          event.preventDefault();
          return;
       }
       const EmploymentDate2 = document.getElementById('EmploymentDate2').value;
       if (!validateDateIsBeforeToday(EmploymentDate2)) {
          alert('Invalid Employment Date. Please enter a date before today.');
          event.preventDefault();
          return;
       }
       const EmploymentDate3 = document.getElementById('EmploymentDate3').value;
       if (!validateDateIsBeforeToday(EmploymentDate3)) {
          alert('Invalid Employment Date. Please enter a date before today.');
          event.preventDefault();
          return;
       }
       
       const StartDate = document.getElementById('StartDate').value;
      if (!validateDateIsAfterToday(StartDate)) {
     alert('Invalid Start Date. Please enter a date after today.');
     event.preventDefault();
     return;
       }

       const ZipCode = document.getElementById('ZipCode').value;
     if (!validateZipCode(ZipCode)) {
         alert('Invalid ZIP Code. Please enter a valid numeric 5 Digit ZIP Code.');
         event.preventDefault();
         return;
     }         
     submitForm(event);
    });
    document.getElementById('viewApplicationsBtn').addEventListener('click', function () {
        displayApplicationsTable();
    });

    let entries = [];
    function submitForm(event) {
        event.preventDefault();
        if (validateForm()) {
            const formData = new FormData(document.getElementById('jobApplicationForm'));
            let data = {};
            for (let pair of formData.entries()) {
                data[pair[0]] = pair[1];
            }
            entries.push(data);
            console.log(entries);
            document.getElementById('jobApplicationForm').reset();
        }
    }
    
    function displayApplicationsTable() {
      const applicationsTable = document.getElementById('applicationsTable');
      applicationsTable.innerHTML = ''; // Clear previous content
  
      if (entries.length === 0) {
          applicationsTable.innerHTML = '<p>No applications submitted.</p>';
          return;
      }
  
      const table = document.createElement('table');
      table.style.width = '100%';
      table.setAttribute('border', '1');
      table.style.borderCollapse = 'collapse';
  
      // Aggregate all keys and values from entries
      let allKeys = [];
      let allValues = [];
      entries.forEach(entry => {
          Object.entries(entry).forEach(([key, value]) => {
              allKeys.push(key);
              value = value instanceof File ? value.name : value; // Handle File objects
              allValues.push(value);
          });
      });
  
      // Process keys and values in batches of 5
      for (let i = 0; i < allKeys.length; i += 5) {
          const trKeys = document.createElement('tr');
          const trValues = document.createElement('tr');
  
          for (let j = i; j < i + 5 && j < allKeys.length; j++) {
              const th = document.createElement('th');
              th.innerText = allKeys[j];
              trKeys.appendChild(th);
  
              const td = document.createElement('td');
              td.innerText = allValues[j];
              trValues.appendChild(td);
          }
  
          table.appendChild(trKeys);
          table.appendChild(trValues);
      }
  
      applicationsTable.appendChild(table);
  }
  
  

    
    function validatePhoneNumber(PhoneNumber) {
       return PhoneNumber.length >= 10;
    }

    function validateEmailAddress(EmailAddress) {

 return EmailAddress.includes('@') && EmailAddress.includes('.');
}

    function validateFileExtension(filename, allowedExtensions) {

       const extension = filename.split('.').pop();
       return allowedExtensions.includes(extension.toLowerCase());
    }

    function validateGraduationYear(GraduationYear) {

       return /^\d{4}$/.test(GraduationYear);
    }


    function validateWillingnessToRelocate(Relocate) {

       return ['yes', 'no'].includes(Relocate.toLowerCase());
    }
    function validateDateIsBeforeToday(dateString) {
       // Convert the date string to a Date object
       if (dateString.trim() === '') {
     return true;
      }
       const selectedDate = new Date(dateString);
       // Get today's date
       const today = new Date();

       // Compare the selected date with today's date
       return selectedDate < today;
    }
    function validateDateIsAfterToday(dateString) {
 // Convert the date string to a Date object
 const selectedDate = new Date(dateString);
 // Get today's date
 const today = new Date();

 // Compare the selected date with today's date
 return selectedDate > today;
    }

    function validateZipCode(ZipCode) {
      // Validate that ZIP code consists of exactly 5 digits
      return /^\d{5}$/.test(ZipCode);
  }
  
 function validateForm() {
    // Include checks for other fields if needed
    return true;  // Always return true if no additional validations are needed
}       
 });