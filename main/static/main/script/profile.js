function OpenTab(TabName) {
    var i;
    var x = document.getElementsByClassName("Tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    document.getElementById(TabName).style.display = "block";  
    const buttons = document.querySelectorAll("button");
              buttons.forEach(button => {
                  button.style.borderTopColor = "#96c9c5";
              });
      const clickedButton = document.querySelector(`[onclick="OpenTab('${TabName}')"]`);
      clickedButton.style.borderTopColor = "red";
      
  }

  function hello(){
    var y = document.getElementsByClassName("course");
     for (j = 1; j < y.length; j++) {
         y[j].style.display = "none";
     }
  }
  hello();
  
  function Openbutton(CourseName) {
     var j;
     var y = document.getElementsByClassName("course");
     for (j = 0; j < y.length; j++) {
         y[j].style.display = "none";
     }
     console.log(CourseName);
     document.getElementById(CourseName).style.display = "block";
  
     var buttons = document.querySelectorAll("button");
              buttons.forEach(button => {
                  button.style.borderTopColor = "#96c9c5";
              });
      var clickedButton = document.querySelector(`[onclick="Openbutton('${CourseName}')"]`);
      clickedButton.style.borderTopColor = "red";
      
  }
  
  function cancelFields() {
      const addressElement = document.getElementById("Address");
      const addressInput = document.getElementById("Address").querySelector("textarea");
      const originalAddress = addressInput.value;
      addressElement.style.border="2px black solid";
      document.getElementById("MobileNumberDisplay").style.display = "inline-block";
      document.getElementById("MobileNumberInput").style.display = "none";
      document.getElementById("PincodeDisplay").style.display = "inline-block";
      document.getElementById("PincodeInput").style.display = "none";
      document.getElementById("editFieldsButton").style.display = "inline-block";
      document.getElementById("cancelFieldsButton").style.display = "none";
      document.getElementById("saveFieldsButton").style.display = "none";
      document.getElementById("state").style.display ='inline-block';
      document.getElementById("district").style.display = 'inline-block';
      document.getElementById("inputState").style.display ="none";
      document.getElementById("inputDistrict").style.display = "none";
      document.getElementById("inputState").disabled = true;
      document.getElementById("inputDistrict").disabled = true;
      document.getElementById("AddressInp").style.display = 'none';
      document.getElementById("Address").style.display ="inline-block";
      addressInput.remove();
      addressElement.innerText = originalAddress;
  }
  
  function editFields() {
      const addressElement = document.getElementById("Address");
      const originalAddress = addressElement.innerText;
      addressElement.style.border="none";
      const addressInput = document.createElement("textarea");
      addressInput.style.width = "700px";
      addressInput.style.height = "auto"; // Let it auto-resize vertically
      addressInput.style.border = "2px solid black";
      addressInput.style.borderRadius = "15px";
      addressInput.value = originalAddress;
  
      addressElement.innerHTML = ''; // Clear the existing content
      addressElement.appendChild(addressInput);
      addressInput.id = "Address-input";
      document.getElementById("MobileNumberDisplay").style.display = "none";
      document.getElementById("MobileNumberInput").style.display = "inline-block";
      document.getElementById("PincodeDisplay").style.display = "none";
      document.getElementById("PincodeInput").style.display = "inline-block";
      document.getElementById("editFieldsButton").style.display = "none";
      document.getElementById("cancelFieldsButton").style.display = "inline-block";
      document.getElementById("saveFieldsButton").style.display = "inline-block";
      document.getElementById("inputState").disabled = false;
      document.getElementById("inputDistrict").disabled = false;
      document.getElementById("inputState").style.display ="inline-block";
      document.getElementById("inputDistrict").style.display = "inline-block";
      document.getElementById("state").style.display ='none';
      document.getElementById("district").style.display = 'none';
      document.getElementById("AddressInp").style.display = 'inline-block';
      document.getElementById("Address").style.display ="none";
  }
  
  const but = document.getElementById("saveFieldsButton");
  but.addEventListener("click",function(event){
    event.preventDefault();
    const newMobileNumber = document.getElementById("MobileNumberInput").value;
      const newPincode = document.getElementById("PincodeInput").value;
      const addressInput = document.getElementById("Address-input").value;
      const mobileNumberDisplay = document.getElementById("MobileNumberDisplay");
      const mobileNumberInput = document.getElementById("MobileNumberInput");
      const pincodeDisplay = document.getElementById("PincodeDisplay");
      const pincodeInput = document.getElementById("PincodeInput");
      const editFieldsButton = document.getElementById("editFieldsButton");
      const saveFieldsButton = document.getElementById("saveFieldsButton");
      const addressElement = document.getElementById("Address");
      const selectedState = document.getElementById("inputState").value;
      const selectedDistrict = document.getElementById("inputDistrict").value;
      
      if (/^[0-9]{10}$/.test(newMobileNumber) && /^[0-9]{6}$/.test(newPincode)) {
          mobileNumberDisplay.textContent = newMobileNumber;
          document.getElementById("state").style.display ='inline-block';
      document.getElementById("district").style.display = 'inline-block';
      document.getElementById("inputState").style.display ="none";
      document.getElementById("AddressInp").style.display = 'none';
      document.getElementById("Address").style.display ="inline-block";
      document.getElementById("inputDistrict").style.display = "none";
          mobileNumberDisplay.style.display = "inline-block";
          mobileNumberInput.style.display = "none";
          pincodeDisplay.textContent = newPincode;
          pincodeDisplay.style.display = "inline-block";
          pincodeInput.style.display = "none";
          editFieldsButton.style.display = "inline-block";
          saveFieldsButton.style.display = "none";
          addressElement.style.border="2px black solid";
          document.getElementById("cancelFieldsButton").style.display="none";
          if(addressInput.length>150){
              addressInput=addressInput.substring(0,200);
          }
          addressElement.innerHTML = addressInput;
          document.getElementById("inputState").disabled = true;
          document.getElementById("inputDistrict").disabled = true;
  
          // Address auto-resizing
          addressElement.style.height = "auto"; // Let it auto-resize vertically
          addressElement.style.overflow = "hidden";
          addressElement.style.height = (addressElement.scrollHeight) + "px";
      } else {
          if (!(/^[0-9]{10}$/.test(newMobileNumber)) && !(/^[0-9]{6}$/.test(newPincode))) {
              alert("Please verify your mobile number and Pincode");
          } else if (!(/^[0-9]{10}$/.test(newMobileNumber)) && (/^[0-9]{6}$/.test(newPincode))) {
              alert("Please verify your mobile number");
          } else {
              alert("Please verify your pincode");
          }
      }

  });
  
  
           
      function handleMobileNumberInput() {
      const mobileNumberInput = document.getElementById("MobileNumberInput");
      if (mobileNumberInput.value.length > 10) {
          alert("Mobile number cannot be more than 10 digits.");
          mobileNumberInput.value = mobileNumberInput.value.substring(0,10);
      }
  }
  document.getElementById("MobileNumberInput").addEventListener("input",handleMobileNumberInput);
        function handlePincode(){
        const pincodeInput = document.getElementById("PincodeInput");
          if(pincodeInput.value.length>6){
          alert("Pincode cannot be more than 6 digits");
          }
          pincodeInput.value=pincodeInput.value.substring(0,6);
        }
  document.getElementById("PincodeInput").addEventListener("input",handlePincode);
  
  document.addEventListener("DOMContentLoaded", function () {
      let skillElements = document.querySelectorAll(".skill");
      skillElements.forEach((element, index) => {
          let numberElement = element.querySelector(".number");
          let circleElement = element.querySelector(`#circle${index + 1}`);
          let percent = parseFloat(numberElement.innerHTML);
          
          let strokeDashoffset = 472 - (percent / 100) * 472;
          circleElement.style.strokeDashoffset = strokeDashoffset;
          numberElement.innerText = "0%";
          let counter = 0;
              let interval = setInterval(() => {
                  if (counter == percent) {
                      clearInterval(interval);
                  }
                  else {
                      counter += 1;
                      numberElement.innerHTML = counter + "%";
                  }
              }, 50);
          if (percent >= 75) {
              numberElement.style.color = "green";
          } else {
              numberElement.style.color = "red";
          }
      });
      
      let skillElements1 = document.querySelectorAll(".skill1");
      skillElements1.forEach((element, index) => {
      let numberElement1 = element.querySelector(".number1");
      let circleElement1 = element.querySelector(`#circles${index + 1}`);
      let percent1 = parseFloat(numberElement1.innerHTML);
      let strokeDashoffsett = 472 - (percent1 / 10) * 472;
      circleElement1.style.strokeDashoffset = strokeDashoffsett;
      numberElement1.innerText = "0";
      let counters = 0;
          let interval = setInterval(() => {
              if (counters == percent1) {
                  clearInterval(interval);
              }
              else {
                  counters += 1;
                  numberElement1.innerHTML = counters;
              }
          }, 300);
      if (percent1 >= 7.5) {
          numberElement1.style.color = "green";
      } else {
          numberElement1.style.color = "red";
      }
  });
  
  
  
  
  
  
  
  var AndraPradesh = ["Anantapur","Chittoor","East Godavari","Guntur","Kadapa","Krishna","Kurnool","Prakasam","Nellore","Srikakulam","Visakhapatnam","Vizianagaram","West Godavari"];
  var ArunachalPradesh = ["Anjaw","Changlang","Dibang Valley","East Kameng","East Siang","Kra Daadi","Kurung Kumey","Lohit","Longding","Lower Dibang Valley","Lower Subansiri","Namsai","Papum Pare","Siang","Tawang","Tirap","Upper Siang","Upper Subansiri","West Kameng","West Siang","Itanagar"];
  var Assam = ["Baksa","Barpeta","Biswanath","Bongaigaon","Cachar","Charaideo","Chirang","Darrang","Dhemaji","Dhubri","Dibrugarh","Goalpara","Golaghat","Hailakandi","Hojai","Jorhat","Kamrup Metropolitan","Kamrup (Rural)","Karbi Anglong","Karimganj","Kokrajhar","Lakhimpur","Majuli","Morigaon","Nagaon","Nalbari","Dima Hasao","Sivasagar","Sonitpur","South Salmara Mankachar","Tinsukia","Udalguri","West Karbi Anglong"];
  var Bihar = ["Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar","Darbhanga","East Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali","West Champaran"];
  var Chhattisgarh = ["Balod","Baloda Bazar","Balrampur","Bastar","Bemetara","Bijapur","Bilaspur","Dantewada","Dhamtari","Durg","Gariaband","Janjgir Champa","Jashpur","Kabirdham","Kanker","Kondagaon","Korba","Koriya","Mahasamund","Mungeli","Narayanpur","Raigarh","Raipur","Rajnandgaon","Sukma","Surajpur","Surguja"];
  var Goa = ["North Goa","South Goa"];
  var Gujarat = ["Ahmedabad","Amreli","Anand","Aravalli","Banaskantha","Bharuch","Bhavnagar","Botad","Chhota Udaipur","Dahod","Dang","Devbhoomi Dwarka","Gandhinagar","Gir Somnath","Jamnagar","Junagadh","Kheda","Kutch","Mahisagar","Mehsana","Morbi","Narmada","Navsari","Panchmahal","Patan","Porbandar","Rajkot","Sabarkantha","Surat","Surendranagar","Tapi","Vadodara","Valsad"];
  var Haryana = ["Ambala","Bhiwani","Charkhi Dadri","Faridabad","Fatehabad","Gurugram","Hisar","Jhajjar","Jind","Kaithal","Karnal","Kurukshetra","Mahendragarh","Mewat","Palwal","Panchkula","Panipat","Rewari","Rohtak","Sirsa","Sonipat","Yamunanagar"];
  var HimachalPradesh = ["Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kullu","Lahaul Spiti","Mandi","Shimla","Sirmaur","Solan","Una"];
  var JammuKashmir = ["Anantnag","Bandipora","Baramulla","Budgam","Doda","Ganderbal","Jammu","Kargil","Kathua","Kishtwar","Kulgam","Kupwara","Leh","Poonch","Pulwama","Rajouri","Ramban","Reasi","Samba","Shopian","Srinagar","Udhampur"];
  var Jharkhand = ["Bokaro","Chatra","Deoghar","Dhanbad","Dumka","East Singhbhum","Garhwa","Giridih","Godda","Gumla","Hazaribagh","Jamtara","Khunti","Koderma","Latehar","Lohardaga","Pakur","Palamu","Ramgarh","Ranchi","Sahebganj","Seraikela Kharsawan","Simdega","West Singhbhum"];
  var Karnataka = ["Bagalkot","Bangalore Rural","Bangalore Urban","Belgaum","Bellary","Bidar","Vijayapura","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Dakshina Kannada","Davanagere","Dharwad","Gadag","Gulbarga","Hassan","Haveri","Kodagu","Kolar","Koppal","Mandya","Mysore","Raichur","Ramanagara","Shimoga","Tumkur","Udupi","Uttara Kannada","Yadgir"];
  var Kerala = ["Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam","Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta","Thiruvananthapuram","Thrissur","Wayanad"];
  var MadhyaPradesh = ["Agar Malwa","Alirajpur","Anuppur","Ashoknagar","Balaghat","Barwani","Betul","Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori","Guna","Gwalior","Harda","Hoshangabad","Indore","Jabalpur","Jhabua","Katni","Khandwa","Khargone","Mandla","Mandsaur","Morena","Narsinghpur","Neemuch","Panna","Raisen","Rajgarh","Ratlam","Rewa","Sagar","Satna",
  "Sehore","Seoni","Shahdol","Shajapur","Sheopur","Shivpuri","Sidhi","Singrauli","Tikamgarh","Ujjain","Umaria","Vidisha"];
  var Maharashtra = ["Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana","Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna","Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded","Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad","Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal"];
  var Manipur = ["Bishnupur","Chandel","Churachandpur","Imphal East","Imphal West","Jiribam","Kakching","Kamjong","Kangpokpi","Noney","Pherzawl","Senapati","Tamenglong","Tengnoupal","Thoubal","Ukhrul"];
  var Meghalaya = ["East Garo Hills","East Jaintia Hills","East Khasi Hills","North Garo Hills","Ri Bhoi","South Garo Hills","South West Garo Hills","South West Khasi Hills","West Garo Hills","West Jaintia Hills","West Khasi Hills"];
  var Mizoram = ["Aizawl","Champhai","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Serchhip","Aizawl","Champhai","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Serchhip"];
  var Nagaland = ["Dimapur","Kiphire","Kohima","Longleng","Mokokchung","Mon","Peren","Phek","Tuensang","Wokha","Zunheboto"];
  var Odisha = ["Angul","Balangir","Balasore","Bargarh","Bhadrak","Boudh","Cuttack","Debagarh","Dhenkanal","Gajapati","Ganjam","Jagatsinghpur","Jajpur","Jharsuguda","Kalahandi","Kandhamal","Kendrapara","Kendujhar","Khordha","Koraput","Malkangiri","Mayurbhanj","Nabarangpur","Nayagarh","Nuapada","Puri","Rayagada","Sambalpur","Subarnapur","Sundergarh"];
  var Punjab = ["Amritsar","Barnala","Bathinda","Faridkot","Fatehgarh Sahib","Fazilka","Firozpur","Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana","Mansa","Moga","Mohali","Muktsar","Pathankot","Patiala","Rupnagar","Sangrur","Shaheed Bhagat Singh Nagar","Tarn Taran"];
  var Rajasthan = ["Ajmer","Alwar","Banswara","Baran","Barmer","Bharatpur","Bhilwara","Bikaner","Bundi","Chittorgarh","Churu","Dausa","Dholpur","Dungarpur","Ganganagar","Hanumangarh","Jaipur","Jaisalmer","Jalore","Jhalawar","Jhunjhunu","Jodhpur","Karauli","Kota","Nagaur","Pali","Pratapgarh","Rajsamand","Sawai Madhopur","Sikar","Sirohi","Tonk","Udaipur"];
  var Sikkim = ["East Sikkim","North Sikkim","South Sikkim","West Sikkim"];
  var TamilNadu = ["Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur","Krishnagiri","Madurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivaganga","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"];
  var Telangana = ["Adilabad","Bhadradri Kothagudem","Hyderabad","Jagtial","Jangaon","Jayashankar","Jogulamba","Kamareddy","Karimnagar","Khammam","Komaram Bheem","Mahabubabad","Mahbubnagar","Mancherial","Medak","Medchal","Nagarkurnool","Nalgonda","Nirmal","Nizamabad","Peddapalli","Rajanna Sircilla","Ranga Reddy","Sangareddy","Siddipet","Suryapet","Vikarabad","Wanaparthy","Warangal Rural","Warangal Urban","Yadadri Bhuvanagiri"];
  var Tripura = ["Dhalai","Gomati","Khowai","North Tripura","Sepahijala","South Tripura","Unakoti","West Tripura"];
  var UttarPradesh = ["Agra","Aligarh","Allahabad","Ambedkar Nagar","Amethi","Amroha","Auraiya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti","Bhadohi","Bijnor","Budaun","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Faizabad","Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kheri","Kushinagar","Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Raebareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli","Shravasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"];
  var Uttarakhand  = ["Almora","Bageshwar","Chamoli","Champawat","Dehradun","Haridwar","Nainital","Pauri","Pithoragarh","Rudraprayag","Tehri","Udham Singh Nagar","Uttarkashi"];
  var WestBengal = ["Alipurduar","Bankura","Birbhum","Cooch Behar","Dakshin Dinajpur","Darjeeling","Hooghly","Howrah","Jalpaiguri","Jhargram","Kalimpong","Kolkata","Malda","Murshidabad","Nadia","North 24 Parganas","Paschim Bardhaman","Paschim Medinipur","Purba Bardhaman","Purba Medinipur","Purulia","South 24 Parganas","Uttar Dinajpur"];
  var AndamanNicobar = ["Nicobar","North Middle Andaman","South Andaman"];
  var Chandigarh = ["Chandigarh"];
  var DadraHaveli = ["Dadra Nagar Haveli"];
  var DamanDiu = ["Daman","Diu"];
  var Delhi = ["Central Delhi","East Delhi","New Delhi","North Delhi","North East Delhi","North West Delhi","Shahdara","South Delhi","South East Delhi","South West Delhi","West Delhi"];
  var Lakshadweep = ["Lakshadweep"];
  var Puducherry = ["Karaikal","Mahe","Puducherry","Yanam"];
  
  
  $("#inputState").change(function(){
    var StateSelected = $(this).val();
    var optionsList;
    var htmlString = "";
  
    switch (StateSelected) {
      case "Andra Pradesh":
          optionsList = AndraPradesh;
          break;
      case "Arunachal Pradesh":
          optionsList = ArunachalPradesh;
          break;
      case "Assam":
          optionsList = Assam;
          break;
      case "Bihar":
          optionsList = Bihar;
          break;
      case "Chhattisgarh":
          optionsList = Chhattisgarh;
          break;
      case "Goa":
          optionsList = Goa;
          break;
      case  "Gujarat":
          optionsList = Gujarat;
          break;
      case "Haryana":
          optionsList = Haryana;
          break;
      case "Himachal Pradesh":
          optionsList = HimachalPradesh;
          break;
      case "Jammu and Kashmir":
          optionsList = JammuKashmir;
          break;
      case "Jharkhand":
          optionsList = Jharkhand;
          break;
      case  "Karnataka":
          optionsList = Karnataka;
          break;
      case "Kerala":
          optionsList = Kerala;
          break;
      case  "Madya Pradesh":
          optionsList = MadhyaPradesh;
          break;
      case "Maharashtra":
          optionsList = Maharashtra;
          break;
      case  "Manipur":
          optionsList = Manipur;
          break;
      case "Meghalaya":
          optionsList = Meghalaya ;
          break;
      case  "Mizoram":
          optionsList = Mizoram;
          break;
      case "Nagaland":
          optionsList = Nagaland;
          break;
      case  "Orissa":
          optionsList = Orissa;
          break;
      case "Punjab":
          optionsList = Punjab;
          break;
      case  "Rajasthan":
          optionsList = Rajasthan;
          break;
      case "Sikkim":
          optionsList = Sikkim;
          break;
      case  "Tamil Nadu":
          optionsList = TamilNadu;
          break;
      case  "Telangana":
          optionsList = Telangana;
          break;
      case "Tripura":
          optionsList = Tripura ;
          break;
      case  "Uttaranchal":
          optionsList = Uttaranchal;
          break;
      case  "Uttar Pradesh":
          optionsList = UttarPradesh;
          break;
      case "West Bengal":
          optionsList = WestBengal;
          break;
      case  "Andaman and Nicobar Islands":
          optionsList = AndamanNicobar;
          break;
      case "Chandigarh":
          optionsList = Chandigarh;
          break;
      case  "Dadar and Nagar Haveli":
          optionsList = DadraHaveli;
          break;
      case "Daman and Diu":
          optionsList = DamanDiu;
          break;
      case  "Delhi":
          optionsList = Delhi;
          break;
      case "Lakshadeep":
          optionsList = Lakshadeep ;
          break;
      case  "Pondicherry":
          optionsList = Pondicherry;
          break;
  }
  
  
    for(var i = 0; i < optionsList.length; i++){
      htmlString = htmlString+"<option value='"+ optionsList[i] +"'>"+ optionsList[i] +"</option>";
    }
    $("#inputDistrict").html(htmlString);
  
  });
      });
  
  document.addEventListener('click', function(event) {
    var dropdown = document.getElementById('Demo');
    var button = document.getElementById('profileImage'); 
  
    if (!event.target.closest('.w3-dropdown-click') && event.target !== button) {
      if (dropdown.classList.contains('w3-show')) {
        dropdown.classList.remove('w3-show');
      }
    }
  });
  
  
  function myFunction(event) {
    var dropdown = document.getElementById('Demo');
    if (dropdown.classList.contains('w3-show')) {
      dropdown.classList.remove('w3-show');
    } else {
      dropdown.classList.add('w3-show');
    }
    event.stopPropagation();
  }
  
  
  function Deleteprofile() {
    const fileInput = document.getElementById("fileInput");
    const profileImage = document.getElementById("profileImage");
    if (fileInput.files.length > 0) {
       const but = document.getElementById("submitimg");
       but.click();
    }
}
  
  function updateProfileImage(){
    const fileInput = document.getElementById("fileInput");
    const profileImage = document.getElementById("profileImage");
    if (fileInput.files.length > 0) {
       const but = document.getElementById("submitimg");
       but.click();
    }
  }
  
  function editBio() {
    document.getElementById("bioText").style.display = "none";
    document.getElementById("editInput").style.display = "block";
    document.getElementById("saveButton").style.display = "inline-block";
    document.getElementById("editbutton").style.display = "none";
}

function saveBio() {
    var editedBio = document.getElementById("editInput").value;
    if (editedBio.length > 150) {
    editedBio = editedBio.substring(0, 150);
}
    document.getElementById("bioText").style.display = "block";
    document.getElementById("editInput").style.display = "none";
    document.getElementById("saveButton").style.display = "none";
    document.getElementById("editbutton").style.display = "inline-block";
    
}
