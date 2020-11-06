import {prepareFinalObject} from "../ui-redux/screen-configuration/actions";

export const getImageUrlByFile = file => {
  return new Promise(resolve => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      const fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};

export const getFileSize = (file) => {
  const size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

export const isFileImage = (file) => {
  const mimeType = file["type"];
  return (mimeType && mimeType.split("/")[0] === "image") || false;
};

export const addQueryArg = (url, queries = []) => {
  const urlParts = url.split("?");
  const path = urlParts[0];
  let queryParts = urlParts.length > 1 ? urlParts[1].split("&") : [];
  queries.forEach(query => {
    const key = query.key;
    const value = query.value;
    const newQuery = `${key}=${value}`;
    queryParts.push(newQuery);
  });
  const newUrl = path + "?" + queryParts.join("&");
  return newUrl;
};


export const getUrlParameterValue=(key)=>{
  let params = (new URL(document.location)).searchParams;
    let value = params.get(key);
    return value;
}

export const age=(dateString)=>{
    let birth = new Date(dateString);
    let now = new Date();
    let beforeBirth = ((() => {birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()})() < birth.getTime()) ? 0 : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth;
}



// export const getQueryArg = (url, name) => {
//   if (!url) url = window.location.href;
//   name = name.replace(/[\[\]]/g, "\\$&");
//   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//     results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return "";
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// };

export const mapDispatchToProps=(dispatch)=>{
  return {
    setAppData:(jsonPath,data)=>{
      dispatch(prepareFinalObject(jsonPath,data))
    }
  }
}



export let snackbarObj = {};
snackbarObj.open = true;
snackbarObj.variant = "error";


export const transferDropDownValues = (masterData = [],labelName,valueName,extraObject=[]) => {
  let convertedArray = [];
   masterData.forEach(data => {
    let object ={ label: data[labelName], value:data[valueName] }
    extraObject.forEach((item)=>{
       object[item]=data[item]
    })
    convertedArray.push(object)
  });
  return convertedArray
};

export const headings = [
  {
    id: "/user-home/exiting-fasttag-status",
    heading: "Existing Fastag Status",
  },
  {
    id: `/user-home/tracking`,
    heading: "Tracking"
  },
  {
    id: "/user-home/confirm-rc",
    heading: "Confirm RC Details",
  },
  {
    id: "/user-home",
    heading: "PAN Card Details",
  },
  {
    id: "/user-home/vehicle-details-auto",
    heading: "Confirm RC Details",
  },
  {
    id: "/user-home/vehicle-details-manual",
    heading: "Update Vehicle Information",
  },
  {
    id: "/user-home/otp",
    heading: "",
  },
  {
    id: "/user-home/payment",
    heading: "Payment",
  },
  {
    id: "/user-home/rc-upload",
    heading: "Upload RC",
  },
];

export const getTime = (datetime) =>{

let cDate = new Date(datetime);
let cHrs = cDate.getHours();
let CMins = cDate.getMinutes();
let tHrsFrm = " PM";

if(cHrs>12){
  cHrs = cHrs-12
  cHrs = String(cHrs).padStart(2, '0')
}
if(CMins === 0){
  CMins = "00"
}
if(cHrs === 9 || cHrs === 10 || cHrs === 11){
tHrsFrm = " AM"
if(cHrs < 10){
  cHrs = String(cHrs).padStart(2, '0')
}
}

  return cHrs +":"+ CMins +tHrsFrm; 
}
 
export const getDateandDay = (datetime) => {

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

let cDatime = new Date(datetime);
let cDay = day[cDatime.getDay()];
let cMon = monthNames[cDatime.getMonth()];
let cDate = cDatime.getDate();
if(cDate < 10){
  cDate = String(cDate).padStart(2, '0')
}

return cDate+" "+cMon+" "+cDay;
}
