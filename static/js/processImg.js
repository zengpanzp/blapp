/*!
 * processImg.js
 * @version 1.0
 * @author 流水行舟
 *
 * 这是一个基于canvas，应用在移动端的前端图片压缩的JS，其修正了上传时图片倒转等问题。
 * Date: 2014-07-02
 */
window.EXIF=function(){function e(e){return!!e.exifdata}function t(e,t){t=t||e.match(/^data\:([^\;]+)\;base64,/im)[1]||"",e=e.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var n=atob(e),r=n.length,a=new ArrayBuffer(r),o=new Uint8Array(a),i=0;r>i;i++)o[i]=n.charCodeAt(i);return a}function r(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="blob",n.onload=function(){(200==this.status||0===this.status)&&t(this.response)},n.send()}function a(e,n){function a(t){var r=o(t),a=i(t);e.exifdata=r||{},e.iptcdata=a||{},n&&n.call(e)}if(e instanceof Image||e instanceof HTMLImageElement)if(/^data\:/i.test(e.src)){var s=t(e.src);a(s)}else if(/^blob\:/i.test(e.src)){var l=new FileReader;l.onload=function(e){a(e.target.result)},r(e.src,function(e){l.readAsArrayBuffer(e)})}else{var u=new XMLHttpRequest;u.onload=function(){if("200"!=u.status)throw"Could not load image";a(u.response),u=null},u.open("GET",e.src,!0),u.responseType="arraybuffer",u.send(null)}else if(window.FileReader&&(e instanceof window.Blob||e instanceof window.File)){var l=new FileReader;l.onload=function(e){S&&console.log("Got file of length "+e.target.result.byteLength),a(e.target.result)},l.readAsArrayBuffer(e)}}function o(e){var t=new DataView(e);if(S&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return S&&console.log("Not a valid JPEG"),!1;for(var n,r=2,a=e.byteLength;a>r;){if(255!=t.getUint8(r))return S&&console.log("Not a valid marker at offset "+r+", found: "+t.getUint8(r)),!1;if(n=t.getUint8(r+1),S&&console.log(n),225==n)return S&&console.log("Found 0xFFE1 marker"),d(t,r+4,t.getUint16(r+2)-2);r+=2+t.getUint16(r+2)}}function i(e){var t=new DataView(e);if(S&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return S&&console.log("Not a valid JPEG"),!1;for(var n=2,r=e.byteLength,a=function(e,t){return 56===e.getUint8(t)&&66===e.getUint8(t+1)&&73===e.getUint8(t+2)&&77===e.getUint8(t+3)&&4===e.getUint8(t+4)&&4===e.getUint8(t+5)};r>n;){if(a(t,n)){var o=t.getUint8(n+7);0!==o%2&&(o+=1),0===o&&(o=4);var i=n+8+o,l=t.getUint16(n+6+o);return s(e,i,l)}n++}}function s(e,t,n){for(var r,a,o,i,s,l=new DataView(e),u={},d=t;t+n>d;)28===l.getUint8(d)&&2===l.getUint8(d+1)&&(i=l.getUint8(d+2),i in I&&(o=l.getInt16(d+3),s=o+5,a=I[i],r=c(l,d+5,o),u.hasOwnProperty(a)?u[a]instanceof Array?u[a].push(r):u[a]=[u[a],r]:u[a]=r)),d++;return u}function l(e,t,n,r,a){var o,i,s,l=e.getUint16(n,!a),c={};for(s=0;l>s;s++)o=n+12*s+2,i=r[e.getUint16(o,!a)],!i&&S&&console.log("Unknown tag: "+e.getUint16(o,!a)),c[i]=u(e,o,t,n,a);return c}function u(e,t,n,r,a){var o,i,s,l,u,d,g=e.getUint16(t+2,!a),f=e.getUint32(t+4,!a),h=e.getUint32(t+8,!a)+n;switch(g){case 1:case 7:if(1==f)return e.getUint8(t+8,!a);for(o=f>4?h:t+8,i=[],l=0;f>l;l++)i[l]=e.getUint8(o+l);return i;case 2:return o=f>4?h:t+8,c(e,o,f-1);case 3:if(1==f)return e.getUint16(t+8,!a);for(o=f>2?h:t+8,i=[],l=0;f>l;l++)i[l]=e.getUint16(o+2*l,!a);return i;case 4:if(1==f)return e.getUint32(t+8,!a);for(i=[],l=0;f>l;l++)i[l]=e.getUint32(h+4*l,!a);return i;case 5:if(1==f)return u=e.getUint32(h,!a),d=e.getUint32(h+4,!a),s=new Number(u/d),s.numerator=u,s.denominator=d,s;for(i=[],l=0;f>l;l++)u=e.getUint32(h+8*l,!a),d=e.getUint32(h+4+8*l,!a),i[l]=new Number(u/d),i[l].numerator=u,i[l].denominator=d;return i;case 9:if(1==f)return e.getInt32(t+8,!a);for(i=[],l=0;f>l;l++)i[l]=e.getInt32(h+4*l,!a);return i;case 10:if(1==f)return e.getInt32(h,!a)/e.getInt32(h+4,!a);for(i=[],l=0;f>l;l++)i[l]=e.getInt32(h+8*l,!a)/e.getInt32(h+4+8*l,!a);return i}}function c(e,t,r){var a="";for(n=t;t+r>n;n++)a+=String.fromCharCode(e.getUint8(n));return a}function d(e,t){if("Exif"!=c(e,t,4))return S&&console.log("Not valid EXIF data! "+c(e,t,4)),!1;var n,r,a,o,i,s=t+6;if(18761==e.getUint16(s))n=!1;else{if(19789!=e.getUint16(s))return S&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;n=!0}if(42!=e.getUint16(s+2,!n))return S&&console.log("Not valid TIFF data! (no 0x002A)"),!1;var u=e.getUint32(s+4,!n);if(8>u)return S&&console.log("Not valid TIFF data! (First offset less than 8)",e.getUint32(s+4,!n)),!1;if(r=l(e,s,s+u,F,n),r.ExifIFDPointer){o=l(e,s,s+r.ExifIFDPointer,P,n);for(a in o){switch(a){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":o[a]=D[a][o[a]];break;case"ExifVersion":case"FlashpixVersion":o[a]=String.fromCharCode(o[a][0],o[a][1],o[a][2],o[a][3]);break;case"ComponentsConfiguration":o[a]=D.Components[o[a][0]]+D.Components[o[a][1]]+D.Components[o[a][2]]+D.Components[o[a][3]]}r[a]=o[a]}}if(r.GPSInfoIFDPointer){i=l(e,s,s+r.GPSInfoIFDPointer,y,n);for(a in i){switch(a){case"GPSVersionID":i[a]=i[a][0]+"."+i[a][1]+"."+i[a][2]+"."+i[a][3]}r[a]=i[a]}}return r}function g(t,n){return(t instanceof Image||t instanceof HTMLImageElement)&&!t.complete?!1:(e(t)?n&&n.call(t):a(t,n),!0)}function f(t,n){return e(t)?t.exifdata[n]:void 0}function h(t){if(!e(t))return{};var n,r=t.exifdata,a={};for(n in r)r.hasOwnProperty(n)&&(a[n]=r[n]);return a}function m(t){if(!e(t))return"";var n,r=t.exifdata,a="";for(n in r)r.hasOwnProperty(n)&&(a+="object"==typeof r[n]?r[n]instanceof Number?n+" : "+r[n]+" ["+r[n].numerator+"/"+r[n].denominator+"]\r\n":n+" : ["+r[n].length+" values]\r\n":n+" : "+r[n]+"\r\n");return a}function p(e){return o(e)}var S=!1,P={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},F={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},y={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},D={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},I={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};return{readFromBinaryFile:p,pretty:m,getTag:f,getAllTags:h,getData:g,Tags:P,TiffTags:F,GPSTags:y,StringValues:D}}();

(function() {


  window.compressImg = function(file, afterWidth, callback) {
    var hidCanvas = document.createElement('canvas');
    //生成隐藏画布
    if (hidCanvas.getContext) {
      var hidCtx = hidCanvas.getContext('2d');
    } else {
      alert("对不起，您的浏览器不支持图片压缩及上传功能，请换个浏览器试试~");
    }

    // inputFile.addEventListener("change", function() {
    //通过 this.files 取到 FileList ，这里只有一个
    var p = new Image();
    var reader = new FileReader();
    reader.onload = function(evt) {
      var srcString = evt.target.result;

      //安卓获取的base64数据无信息头，加之
      if (srcString.substring(5, 10) != "image") {
        p.src = srcString.replace(/(.{5})/, "$1image/jpeg;");
      } else {
        p.src = srcString;
      }

      p.onload = function() {

        var upImgWidth = p.width,
          upImgHeight = p.height;
        var orientation = 1;
        //获取图像的方位信息
        EXIF.getData(p, function() {
          orientation = parseInt(EXIF.getTag(p, "Orientation"));
          orientation = orientation ? orientation : 1;
        });
        //压缩换算后的图片高度
        var afterHeight = afterWidth * upImgHeight / upImgWidth;
        if (upImgWidth < 10 || upImgWidth < 10) {
          alert("请不要上传过小的图片");
          self.value = "";
          return false;
        } else {

          if (orientation <= 4) {
            // 设置压缩canvas区域高度及宽度
            hidCanvas.setAttribute("height", afterHeight);
            hidCanvas.setAttribute("width", afterWidth);
            if (orientation == 3 || orientation == 4) {
              hidCtx.translate(afterWidth, afterHeight);
              hidCtx.rotate(180 * Math.PI / 180);
            }
          } else {
            // 设置压缩canvas区域高度及宽度
            hidCanvas.setAttribute("height", afterWidth);
            hidCanvas.setAttribute("width", afterHeight);

            if (orientation == 5 || orientation == 6) {
              hidCtx.translate(afterHeight, 0);
              hidCtx.rotate(90 * Math.PI / 180);
            } else if (orientation == 7 || orientation == 8) {
              hidCtx.translate(0, afterWidth);
              hidCtx.rotate(270 * Math.PI / 180);
            }
          }

          // canvas绘制压缩后图片
          drawImageIOSFix(hidCtx, p, 0, 0, upImgWidth, upImgHeight, 0, 0, afterWidth, afterHeight);
          // 获取压缩后生成的img对象
          self.value = "";
          // 此处将得到的图片数据回调
          if (callback != undefined) { callback(convertCanvasToImage(hidCanvas).src) };
        }
      }
    }
    reader.readAsDataURL(file);
    // }, false);
  }

  //canvas转图像
  function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/jpeg");
    return image;
  }

  /**
   * 以下代码是修复canvas在ios中显示压缩的问题。
   * Detecting vertical squash in loaded image.
   * Fixes a bug which squash image vertically while drawing into canvas for some images.
   * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
   *
   */
  function detectVerticalSquash(img) {
    var iw = img.naturalWidth,
      ih = img.naturalHeight;
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
      var alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    var ratio = (py / ih);
    return (ratio === 0) ? 1 : ratio;
  }

  /**
   * A replacement for context.drawImage
   * (args are for source and destination).
   */
  function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    var vertSquashRatio = detectVerticalSquash(img);
    // Works only if whole image is displayed:
    // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
    // The following works correct also when only a part of the image is displayed:
    ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio,
      sw * vertSquashRatio, sh * vertSquashRatio,
      dx, dy, dw, dh);
  }

})();
