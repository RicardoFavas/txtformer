import React from 'react';
import _ from 'lodash';
import Papa from 'papaparse';

import { Input } from 'antd';
import { Badge } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Menu, Icon } from 'antd';
import { Select } from 'antd';
import { Tooltip } from 'antd';
import { Checkbox } from 'antd';
import { Form } from 'antd';
import { Radio } from 'antd';
import { InputNumber } from 'antd';

function hash_md5(e) { function h(a, b) { var c, d, e, f, g; e = a & 2147483648; f = b & 2147483648; c = a & 1073741824; d = b & 1073741824; g = (a & 1073741823) + (b & 1073741823); return c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f } function k(a, b, c, d, e, f, g) { a = h(a, h(h(b & c | ~b & d, e), g)); return h(a << f | a >>> 32 - f, b) } function l(a, b, c, d, e, f, g) { a = h(a, h(h(b & d | c & ~d, e), g)); return h(a << f | a >>> 32 - f, b) } function m(a, b, d, c, e, f, g) { a = h(a, h(h(b ^ d ^ c, e), g)); return h(a << f | a >>> 32 - f, b) } function n(a, b, d, c, e, f, g) { a = h(a, h(h(d ^ (b | ~c), e), g)); return h(a << f | a >>> 32 - f, b) } function p(a) { var b = "", d = "", c; for (c = 0; 3 >= c; c++) d = a >>> 8 * c & 255, d = "0" + d.toString(16), b += d.substr(d.length - 2, 2); return b } var f = [], q, r, s, t, a, b, c, d; e = function(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", d = 0; d < a.length; d++) { var c = a.charCodeAt(d); 128 > c ? b += String.fromCharCode(c) : (127 < c && 2048 > c ? b += String.fromCharCode(c >> 6 | 192) : (b += String.fromCharCode(c >> 12 | 224), b += String.fromCharCode(c >> 6 & 63 | 128)), b += String.fromCharCode(c & 63 | 128)) } return b }(e); f = function(b) { var a, c = b.length; a = c + 8; for (var d = 16 * ((a - a % 64) / 64 + 1), e = Array(d - 1), f = 0, g = 0; g < c;) a = (g - g % 4) / 4, f = g % 4 * 8, e[a] |= b.charCodeAt(g) << f, g++; a = (g - g % 4) / 4; e[a] |= 128 << g % 4 * 8; e[d - 2] = c << 3; e[d - 1] = c >>> 29; return e }(e); a = 1732584193; b = 4023233417; c = 2562383102; d = 271733878; for (e = 0; e < f.length; e += 16) q = a, r = b, s = c, t = d, a = k(a, b, c, d, f[e + 0], 7, 3614090360), d = k(d, a, b, c, f[e + 1], 12, 3905402710), c = k(c, d, a, b, f[e + 2], 17, 606105819), b = k(b, c, d, a, f[e + 3], 22, 3250441966), a = k(a, b, c, d, f[e + 4], 7, 4118548399), d = k(d, a, b, c, f[e + 5], 12, 1200080426), c = k(c, d, a, b, f[e + 6], 17, 2821735955), b = k(b, c, d, a, f[e + 7], 22, 4249261313), a = k(a, b, c, d, f[e + 8], 7, 1770035416), d = k(d, a, b, c, f[e + 9], 12, 2336552879), c = k(c, d, a, b, f[e + 10], 17, 4294925233), b = k(b, c, d, a, f[e + 11], 22, 2304563134), a = k(a, b, c, d, f[e + 12], 7, 1804603682), d = k(d, a, b, c, f[e + 13], 12, 4254626195), c = k(c, d, a, b, f[e + 14], 17, 2792965006), b = k(b, c, d, a, f[e + 15], 22, 1236535329), a = l(a, b, c, d, f[e + 1], 5, 4129170786), d = l(d, a, b, c, f[e + 6], 9, 3225465664), c = l(c, d, a, b, f[e + 11], 14, 643717713), b = l(b, c, d, a, f[e + 0], 20, 3921069994), a = l(a, b, c, d, f[e + 5], 5, 3593408605), d = l(d, a, b, c, f[e + 10], 9, 38016083), c = l(c, d, a, b, f[e + 15], 14, 3634488961), b = l(b, c, d, a, f[e + 4], 20, 3889429448), a = l(a, b, c, d, f[e + 9], 5, 568446438), d = l(d, a, b, c, f[e + 14], 9, 3275163606), c = l(c, d, a, b, f[e + 3], 14, 4107603335), b = l(b, c, d, a, f[e + 8], 20, 1163531501), a = l(a, b, c, d, f[e + 13], 5, 2850285829), d = l(d, a, b, c, f[e + 2], 9, 4243563512), c = l(c, d, a, b, f[e + 7], 14, 1735328473), b = l(b, c, d, a, f[e + 12], 20, 2368359562), a = m(a, b, c, d, f[e + 5], 4, 4294588738), d = m(d, a, b, c, f[e + 8], 11, 2272392833), c = m(c, d, a, b, f[e + 11], 16, 1839030562), b = m(b, c, d, a, f[e + 14], 23, 4259657740), a = m(a, b, c, d, f[e + 1], 4, 2763975236), d = m(d, a, b, c, f[e + 4], 11, 1272893353), c = m(c, d, a, b, f[e + 7], 16, 4139469664), b = m(b, c, d, a, f[e + 10], 23, 3200236656), a = m(a, b, c, d, f[e + 13], 4, 681279174), d = m(d, a, b, c, f[e + 0], 11, 3936430074), c = m(c, d, a, b, f[e + 3], 16, 3572445317), b = m(b, c, d, a, f[e + 6], 23, 76029189), a = m(a, b, c, d, f[e + 9], 4, 3654602809), d = m(d, a, b, c, f[e + 12], 11, 3873151461), c = m(c, d, a, b, f[e + 15], 16, 530742520), b = m(b, c, d, a, f[e + 2], 23, 3299628645), a = n(a, b, c, d, f[e + 0], 6, 4096336452), d = n(d, a, b, c, f[e + 7], 10, 1126891415), c = n(c, d, a, b, f[e + 14], 15, 2878612391), b = n(b, c, d, a, f[e + 5], 21, 4237533241), a = n(a, b, c, d, f[e + 12], 6, 1700485571), d = n(d, a, b, c, f[e + 3], 10, 2399980690), c = n(c, d, a, b, f[e + 10], 15, 4293915773), b = n(b, c, d, a, f[e + 1], 21, 2240044497), a = n(a, b, c, d, f[e + 8], 6, 1873313359), d = n(d, a, b, c, f[e + 15], 10, 4264355552), c = n(c, d, a, b, f[e + 6], 15, 2734768916), b = n(b, c, d, a, f[e + 13], 21, 1309151649), a = n(a, b, c, d, f[e + 4], 6, 4149444226), d = n(d, a, b, c, f[e + 11], 10, 3174756917), c = n(c, d, a, b, f[e + 2], 15, 718787259), b = n(b, c, d, a, f[e + 9], 21, 3951481745), a = h(a, q), b = h(b, r), c = h(c, s), d = h(d, t); return (p(a) + p(b) + p(c) + p(d)).toLowerCase(); }
function hash_sha1(str) { var hash; var _rotLeft = function (n, s) { var t4 = (n << s) | (n >>> (32 - s)); return t4; }; var _cvtHex = function (val) { var str = ''; var i; var v; for (i = 7; i >= 0; i--) { v = (val >>> (i * 4)) & 0x0f; str += v.toString(16); } return str; }; var blockstart; var i, j; var W = new Array(80); var H0 = 0x67452301; var H1 = 0xEFCDAB89; var H2 = 0x98BADCFE; var H3 = 0x10325476; var H4 = 0xC3D2E1F0; var A, B, C, D, E; var temp; str = unescape(encodeURIComponent(str)); var strLen = str.length; var wordArray = []; for (var i = 0; i < strLen - 3; i += 4) { j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3); wordArray.push(j); } switch (strLen % 4) { case 0: i = 0x080000000; break; case 1: i = str.charCodeAt(strLen - 1) << 24 | 0x0800000; break; case 2: i = str.charCodeAt(strLen - 2) << 24 | str.charCodeAt(strLen - 1) << 16 | 0x08000; break; case 3: i = str.charCodeAt(strLen - 3) << 24 | str.charCodeAt(strLen - 2) << 16 | str.charCodeAt(strLen - 1) << 8 | 0x80; break; } wordArray.push(i); while ((wordArray.length % 16) !== 14) { wordArray.push(0); } wordArray.push(strLen >>> 29); wordArray.push((strLen << 3) & 0x0ffffffff); for (var blockstart = 0; blockstart < wordArray.length; blockstart += 16) { for (i = 0; i < 16; i++) { W[i] = wordArray[blockstart + i]; } for (i = 16; i <= 79; i++) { W[i] = _rotLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1); } A = H0; B = H1; C = H2; D = H3; E = H4; for (i = 0; i <= 19; i++) { temp = (_rotLeft(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff; E = D; D = C; C = _rotLeft(B, 30); B = A; A = temp; } for (i = 20; i <= 39; i++) { temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff; E = D; D = C; C = _rotLeft(B, 30); B = A; A = temp; } for (i = 40; i <= 59; i++) { temp = (_rotLeft(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff; E = D; D = C; C = _rotLeft(B, 30); B = A; A = temp; } for (i = 60; i <= 79; i++) { temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff; E = D; D = C; C = _rotLeft(B, 30); B = A; A = temp; } H0 = (H0 + A) & 0x0ffffffff; H1 = (H1 + B) & 0x0ffffffff; H2 = (H2 + C) & 0x0ffffffff; H3 = (H3 + D) & 0x0ffffffff; H4 = (H4 + E) & 0x0ffffffff; } temp = _cvtHex(H0) + _cvtHex(H1) + _cvtHex(H2) + _cvtHex(H3) + _cvtHex(H4); return temp.toLowerCase(); }
function hash_string(str) { let hash = 0, len = str.length; if (str.length === 0) { return String(hash); } for (let i = 0; i < len; i++) { let charC = str.charCodeAt(i); hash = ((hash<<5)-hash)+charC; hash = hash & hash; } return String(hash); }

function removeDuplicates(arr){
  let uniques = {};
  return arr.filter(
    v => {
      if (uniques.hasOwnProperty(v))
        return false;
      uniques[v] = null;
      return true;
    }
  )
}

function strToArray(str){
  let arr = [];
  if (str == null)
    return arr;
  for (let i = 0; i < str.length; i++)
    arr.push(str.charAt(i));
  return arr;
}

function slicesToArray(slices){
  let arr = [];
  if (_.isEmpty(slices))
    return arr;
  slices.forEach(
    e => {
      let s = String(e).split('-');
      if (s.length === 1)
        arr.push(parseInt(s[0]));
      else if (s.length === 2)
        for (let i = parseInt(s[0]); i <= parseInt(s[1]); i++)
          arr.push(i);
    }
  )
  return removeDuplicates(arr);
}

function convertToAlphabet(num) {
    let mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? convertToAlphabet(pow) + out : out;
}
function convertToRoman(num) {
  let converterArray = {
    "1":["I","IV","V","IX"],
    "2":["X","XL","L","XC"],
    "3":["C","CD","D","CM"],
    "4":["M"]
  };
  let romanNumeral = [];
  let numArr = num.toString().split('');
  let numLength = numArr.length;

  for (let i = 0; i<numArr.length; i++) {
    if (numArr[i] < 4) {
      for (let j = 0; j<numArr[i]; j++)
        romanNumeral.push(converterArray[numLength][0]);
    } else if (numArr[i] < 5) {
      for (let j = 3; j<numArr[i]; j++)
        romanNumeral.push(converterArray[numLength][1]);
    } else if (numArr[i] < 9) {
      romanNumeral.push(converterArray[numLength][2]);
      for (let j = 5; j<numArr[i]; j++)
        romanNumeral.push(converterArray[numLength][0]);
    } else if (numArr[i] < 10) {
      for (let j = 8; j<numArr[i]; j++)
        romanNumeral.push(converterArray[numLength][3]);
    }
    numLength--;
  }
  return romanNumeral.join('');
}

function toSql(value,database){
  if (value === '')
    return sqlNull(database);
  return "'"+value+"'";
}
function sqlNull(database){
  return "null";
}

const PAPA_CONFIGS = {
  'xlsConfigs': {
    delimiter: "\t", newline: "\n", quoteChar: '"', header: false, dynamicTyping: false,
    encoding: "", worker: false, comments: false, step: undefined, preview: 0,
    complete: undefined, error: undefined, download: false, skipEmptyLines: false,
    chunk: undefined, fastMode: undefined, beforeFirstChunk: undefined, withCredentials: undefined
  },
  'csvConfigs': {
    delimiter: ",", newline: "\n", quoteChar: '"', header: false, dynamicTyping: false,
    encoding: "", worker: false, comments: false, step: undefined, preview: 0,
    complete: undefined, error: undefined, download: false, skipEmptyLines: false,
    chunk: undefined, fastMode: undefined, beforeFirstChunk: undefined, withCredentials: undefined
  }
}




















//Transformations list
export default {
  'Transformations':[
    {
      'label':'Replace',
      'tags':['substitute'],
      'hint': (<div>Replaces matches for pattern in the document with replacement</div>),
      'process': (input,options) => {
        let flags = 'g';
        if (options.ignoreCase)
          flags += 'i';
        let pattern = options.pattern;
        if (options.mode === 'regex')
          pattern = new RegExp(options.pattern,flags);
        else if (options.mode === 'normal')
          pattern = new RegExp(_.escapeRegExp(options.pattern),flags);
        return input.replace(pattern,options.replacement);
      },
      'options':{
        'pattern':'',
        'replacement':'',
        'mode':'normal',
        'ignoreCase':true
      },
      'optionsDialog':
        (options) => {
          return (
            <Form>
              <Form.Item label="Find what">
                <Input defaultValue={options.pattern} onChange={e => options.pattern = e.target.value}/>
              </Form.Item>
              <Form.Item label="Replace with">
                <Input defaultValue={options.replacement} onChange={e => options.replacement = e.target.value}/>
              </Form.Item>
              <Form.Item label="Search Mode" layout="inline">
                  <Checkbox defaultChecked={options.ignoreCase} onChange={e => options.ignoreCase = e.target.checked}>Ignore case</Checkbox>
                  <Radio.Group defaultValue={options.mode} onChange={e => options.mode = e.target.value}>
                    <Radio  value={'normal'}>Normal</Radio>
                    <Radio  value={'regex'}>Regex</Radio>
                  </Radio.Group>
              </Form.Item>
            </Form>
          )
        }
    },
    {
      'label':'Encode Base64',
      'tags':['64','convert','encrypt','base'],
      'process': (input,options) => btoa(input)
    },
    {
      'label':'Decode Base64',
      'tags':['64','convert','decrypt','base'],
      'process': (input,options) => atob(input)
    },
    {
      'label':'Extract Emails',
      'tags':['address','contact'],
      'process': (input,options) => {
        let matches = input.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        if (matches == null)
          return '';
        return matches.join('\n');
      }
    },
    {
      'label':'Remove Duplicated Spaces',
      'tags':[],
      'hint': (<div>Removes duplicated spaces from the document</div>),
      'process': (input,options) => input.replace(/((?![\r\n])\s){2,}/g,' '),
    },
    {
      label:'Uppercase',
      'process': (input,options) => input.toUpperCase(),
      'hint': (<div>Converts the document to UPPER case</div>),
    },
    {
      'label':'Lowercase',
      'process': (input,options) => input.toLowerCase(),
      'hint': (<div>Converts the document to lower case</div>),
    },
    {
      'label':'ProperCase',
      'hint': (<div><div>foo bar</div><div>Foo Bar</div></div>),
      'process': (input,options) => input.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase())
    },
    {
      'label':'Trim',
      'process': (input,options) => input.trim(),
      'hint': (<div>Removes leading and trailing whitespace from the document</div>),
    },
    {
      'label':'Right Trim',
      'hint': (<div>Removes trailing whitespace from the document</div>),
      'process': (input,options) => input.replace(/\s+$/,"")
    },
    {
      'label':'Left Trim',
      'hint': (<div>Removes leading whitespace from the document</div>),
      'process': (input,options) => input.replace(/^\s+/,"")
    },
    {
      'label':'Remove Blank Lines',
      'hint': (<div>Removes empty and blank lines from de document</div>),
      'process': (input,options) => input.split('\n').filter(l => l.trim() !== "").join('\n')
    },
    {
      'label':'Remove Empty Lines',
      'hint': (<div>Removes empty lines from the document</div>),
      'process': (input,options) => input.split('\n').filter(l => l !== "").join('\n'),
    },
    {
      'label':'Trim Lines',
      'process': (input,options) => input.split('\n').map(l => l.trim()).join('\n'),
      'hint': (<div>Removes leading and trailing whitespace from lines</div>),
    },
    {
      'label':'Right Trim Lines',
      'process': (input,options) => input.split('\n').map(l => l.replace(/\s+$/,"")).join('\n'),
      'hint': (<div>Removes trailing whitespace from lines</div>),
    },
    {
      'label':'Left Trim Lines',
      'process': (input,options) => input.split('\n').map(l => l.replace(/^\s+/,"")).join('\n'),
      'hint': (<div>Removes leading whitespace from lines</div>),
    },
    {
      'label':'Sort Ascending',
      'hint': (<div>Sort ascending the lines from the document</div>),
      'process': (input,options) => input.split('\n').sort().join("\n"),
    },
    {
      label:'Sort Descending',
      'process': (input,options) => input.split('\n').sort().reverse().join("\n"),
      'hint': (<div>Sort descending the lines from the document</div>),
    },
    {
      label:'Remove Duplicate',
      'hint': (<div>Remote duplicate lines from the document</div>),
      'process': (input,options) => input.split('\n').filter((el, i, arr) => arr.indexOf(el) === i).join('\n'),
    },
    {
      'label':'SQL Escape',
      'hint': "Replaces all instances of ' with ''",
      'process': (input,options) => input.replace(/'/g,"''"),
    },
    {
      'label':'SQL Unescape',
      'hint': (<div>SQL Escape: replace all instances of '' with '</div>),
      'process': (input,options) => input.replace(/''/g,"'"),
    },
    {
      'label':'Add Line Number',
      'options': {'separator':'. ','countMode':'Decimal'},
      'process':
        (input,options) => {
          return input.split('\n').map(
            (l,k) => {
              let n = (k+1)
              if (options.countMode === 'Decimal')
                ;
              else if (options.countMode === 'Roman')
                n = convertToRoman(n);
              else if (options.countMode === 'Alphabetic')
                n = convertToAlphabet(n);
              else if (options.countMode === 'Binary')
                n = n.toString(2);
              return n+options.separator+l;
            }
          ).join('\n')
        },
      'optionsDialog':
        (options) => {
          return (
            <div>
              <Tooltip placement="right" title={"Separator"}>
                <Input
                  addonBefore={
                    <Select
                      floatingLabelText="Count Mode"
                      defaultValue={options.countMode}
                      onChange={e => options.countMode = e}
                      style={{ width: 100 }}
                    >
                      <Select.Option value={"Decimal"}>Decimal</Select.Option>
                      <Select.Option value={"Binary"} >Binary</Select.Option>
                      <Select.Option value={"Roman"} >Roman</Select.Option>
                      <Select.Option value={"Alphabetic"}>Alphabetic</Select.Option>
                    </Select>
                  }
                  defaultValue={options.separator}
                  onChange={e => options.separator = e.target.value}/>
              </Tooltip>
            </div>
          )
        }
    },
    {
      'label':'Join Lines',
      'options': {'start':'','separator':',','end':''},
      'optionsDialog':
        (options) => {
          return (
            <div>
              <Form.Item label="Start Character">
                <Input defaultValue={options.start} onChange={e => options.start = e.target.value}/>
              </Form.Item>
              <Form.Item label="Separator">
                <Input defaultValue={options.separator} onChange={e => options.separator = e.target.value}/>
              </Form.Item>
              <Form.Item label="End Character">
                <Input defaultValue={options.end} onChange={e => options.end = e.target.value}/>
              </Form.Item>
            </div>
          )
        },
        'process': (input,options) => options.start + input.split('\n').join(options.separator) + options.end,
    },
    {
      'label':'Lines to SQL in',
      'process': (input,options) => "("+input.split('\n').map(l => "'"+l.replace("''","'")+"'").join(',')+")",
    },
    {
      'label':'HTML Escape',
      'process': (input,options) => _.escape(input),
    },
    {
      'label':'HTML Unescape',
      'process': (input,options) => _.escape(input)
    },
    {
      'label': 'URL Encode',
      'process': (input,options) => encodeURI(input)
    },
    {
      'label':'URL Decode',
      'process': (input,options) => decodeURI(input)
    },
    {
      'label':'Javascript RegExp Escape',
      'process': (input,options) => _.escapeRegExp(input)
    },
    {
      'label':'Extract Words',
      'process': (input,options) => input.split(/\s+/g).join('\n'),
      'hint': (<div>Extract words from the document into lines</div>),
    },
    {
      'label':'Extract Numbers',
      'process': (input,options) => {
        let matches = input.match(/[+-]?((\.\d+)|(\d+(\.\d+)?)([eE][+-]?\d+)?)/g);
        if ( matches === null )
          return '';
        return matches.join('\n');
      },
      'hint': (<div>Extract words from the document into lines</div>),
    },
    {
      'label':'InvertCase',
      'process': (input,options) => input.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("")
    },
    {
      'label':'RandomCase',
      'tags':[],
      'process': input => {
        let out = '';
        for (var i = 0; i<input.length; i++)
            out += Math.random() >= 0.5 ? input.charAt(i).toUpperCase() : input.charAt(i).toLowerCase();
        return out;
      }
    },
    {
      'label':'XLS to CSV',
      'tags':['csv','excel'],
      'hint':'Same has CSV to CSV with a tab delimiter to comma delimiter',
      'options':{'pattern':'','regex':false,'ci':true},
      'process':
        (input,options) => {
            let result = Papa.parse(input,PAPA_CONFIGS.xlsConfigs);
            result = Papa.unparse(result.data,PAPA_CONFIGS.csvConfigs);
            return result;
        }
    },
    {
      'label':'Custom Script',
      'tags':['javascript','ecmascript'],
      'hint':'Custom Script in Javasscript',
      'options':{'costume':'var output = input;\nreturn output;'},
      'optionsDialog':
        (options) => {
          return (
            <Form.Item label={"Costume Script in Javascript"}>
              <Input type="textarea" style={{width:600,height:200}}
                defaultValue={options.costume}
                onChange={e => options.costume = e.target.value}
              />
            </Form.Item>
          )
        },
      'process': (input,options) => {
        return new Function('input',options.costume)(input);
      }
    },
    {
      'label':'CSV to SQL Insert',
      'tags':['insert','sql'],
      'hint':null,
      'options':{'database':'','header':false,'tablename':''},
      'optionsDialog':
        (options) => {
          return (
            <div>
              <Form.Item label="Table name">
                <Input defaultValue={options.tablename} onChange={e => options.tablename = e.target.value}/>
              </Form.Item>
              <Checkbox defaultChecked={options.header} onChange={e => options.header = !options.header}>Use first row as Header</Checkbox>
            </div>
          )
        },
      'process': (input,options) => {
        let papa = Papa.parse(input,{'header':options.header});
        let lineStart = 'insert into ';
        lineStart += options.tablename !== '' ? options.tablename : "[tablename]";
        lineStart += ' (';

        let result = '';
        if (options.header){
          lineStart += papa.meta.fields.join(',');
          lineStart += ") values (";
          papa.data.forEach(
            row => {
              result += lineStart;
              result += papa.meta.fields.map(field => (field in row ? toSql(row[field],options.database) : sqlNull(options.database))
              ).join(",");
              result += ");\n";
            }
          );
        } else {
          papa.data.forEach(
            row => {
              result += lineStart;
              result += row.map((v,k) => '[col'+k+']').join(',');
              result += ") values (";
              result += row.map(v => toSql(v,options.database)).join(',');
              result += ");\n";
            }
          )
        }
        return result;
      }
    },
    {
      'label':'IteratingCase',
      'tags':[],
      'options': {'firstLetter':'random'},
      'optionsDialog':
        (options) => {
          return (
            <Form.Item label="First Letter" layout="inline">
              <Radio.Group defaultValue={options.firstLetter} onChange={e => options.firstLetter = e.target.value}>
                <Radio  value={'random'}>Random</Radio>
                <Radio  value={'lowercase'}>Lowercase</Radio>
                <Radio  value={'uppercase'}>Uppercase</Radio>
              </Radio.Group>
            </Form.Item>
          )
      },
      'process': (input,options) => {
        let upperFirst = false;
        if (options.firstLetter === "random")
          upperFirst = Math.random() >= 0.5;
        else if (options.firstLetter === "uppercase")
          upperFirst = true;
        return strToArray(input).map(
          e => {
            e = upperFirst ? e.toUpperCase() : e.toLowerCase();
            upperFirst = !upperFirst;
            return e;
          }
        ).join("");
      }
    },
    {
      'label':'Binary',
      'tags':[],
      'options':{'wordSize':'16bit'},
      'optionsDialog':
        (options) => {
          return (
            <Form.Item label="Word size" layout="inline">
              <Radio.Group defaultValue={options.wordSize} onChange={e => options.wordSize = e.target.value}>
                <Radio  value={'16bit'}>16bit</Radio>
                <Radio  value={'32bit'}>32bit</Radio>
              </Radio.Group>
            </Form.Item>
          )
        },
      'process': (input,options) => {
        let wordSize = 32;
        if (options.wordSize === "16bit")
          wordSize = 16;
        else if (options.wordSize === "32bit")
          wordSize = 32;
        return strToArray(input).map(
          e => {
            let bin = "00000000000000000000000000000000";
            e = e.charCodeAt(0);
            bin += e.toString(2);
            bin = bin.slice(-wordSize);
            return bin;
          }
        ).join(" ");
      }
    },
    {
      'label':'Hexadecimal',
      'tags':[],
      'options':{'wordSize':'16bit'},
      'optionsDialog':
        (options) => {
          return (
            <Form.Item label="Word size" layout="inline">
              <Radio.Group defaultValue={options.wordSize} onChange={e => options.wordSize = e.target.value}>
                <Radio  value={'16bit'}>16bit</Radio>
                <Radio  value={'32bit'}>32bit</Radio>
              </Radio.Group>
            </Form.Item>
          )
        },
      'process': (input,options) => {
        let wordSize = 4;
        if (options.wordSize === "16bit")
          wordSize = 2;
        else if (options.wordSize === "32bit")
          wordSize = 4;
        return strToArray(input).map(
          e => {
            let bin = "0000";
            e = e.charCodeAt(0);
            bin += e.toString(16);
            bin = bin.slice(-wordSize);
            return bin;
          }
        ).join(" ");
      }
    },
    {
      'label':'Decimal',
      'tags':[],
      'options':{'wordSize':'16bit'},
      'optionsDialog':
        (options) => {
          return (
            <Form.Item label="Word size" layout="inline">
              <Radio.Group defaultValue={options.wordSize} onChange={e => options.wordSize = e.target.value}>
                <Radio  value={'16bit'}>16bit</Radio>
                <Radio  value={'32bit'}>32bit</Radio>
              </Radio.Group>
            </Form.Item>
          )
        },
      'process': (input,options) => {
        let wordSize = 4;
        if (options.wordSize === "16bit")
          wordSize = 4;
        else if (options.wordSize === "32bit")
          wordSize = 5;
        return strToArray(input).map(
          e => {
            let bin = "00000";
            e = e.charCodeAt(0);
            bin += e.toString();
            bin = bin.slice(-wordSize);
            return bin;
          }
        ).join(" ");
      }
    },
    {
      'label':'Remove XML Tags',
      'tags':[],
      'hint':'Removes XML tags from the document',
      'options':{},
      'process': (input,options) => input.replace(/(<([^>]+)>)/ig,"")},
    {
      'label':'ROT13',
      'tags':[],
      'process': (input,options) => input.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);})
    },
    {
      'label':'Filter Lines',
      'tags':['remove',],
      'hint':'Not implemented yet',
      'options':{'pattern':'','regex':false,'ci':true}
    },
    {
      'label':'Slice Document',
      'hint':'Slice the document from line to line',
      'tags':[],
      'options':{'slices':[],'zeroIndex':true},
      'optionsDialog':
        (options) => {
          return (
            <div>
              <Checkbox defaultChecked={options.zeroIndex} onChange={e => options.zeroIndex = e.target.checked}>Zero index</Checkbox>
              <Form.Item label="Slices">
                <Select
                   mode="tags"
                   placeholder="1,2,3,10,15,20-30"
                   style={{ width: '300px' }}
                   defaultValue={options.slices}
                   onChange={e => options.slices = e}
                   tokenSeparators={[' ',',']}
                 >
                 </Select>
               </Form.Item>
            </div>
          )
        },
      'process': (input,options) => {
        let zindex = options.zeroIndex ? 0 : 1;
        let splitted = input.split('\n');
        return slicesToArray(options.slices).map(
            (v) => splitted[v-zindex]
        ).join('\n')
      }
    },
    {
      'label':'Slice Lines',
      'hint':'Slice lines from index to index',
      'tags':[],
      'options':{'slices':[],'zeroIndex':true},
      'optionsDialog':
        (options) => {
          return (
            <div>
              <Checkbox defaultChecked={options.zeroIndex} onChange={e => options.zeroIndex = e.target.checked}>Zero index</Checkbox>
              <Form.Item label="Slices">
                <Select
                   mode="tags"
                   placeholder="1,2,3,10,15,20-30"
                   style={{ width: '300px' }}
                   defaultValue={options.slices}
                   onChange={e => options.slices = e}
                   tokenSeparators={[' ',',']}
                 >
                 </Select>
              </Form.Item>
            </div>
          )
        },
      'process': (input,options) => {
        let zindex = options.zeroIndex ? 0 : 1;
        let chrs = slicesToArray(options.slices);
        return input.split('\n').map(
          line => {
            let out = "";
            chrs.forEach(v => out += line.charAt(v-zindex))
            return out;
          }
        ).join("\n")
      }
    },
    {
      'label':'Hash',
      'tags':['javascript','digest','md5','sha','md4'],
      'hint':'Digest the input in various algorithms',
      'options':{'function':'javascript'},
      'optionsDialog': options => {
        return (
          <Form.Item label="Hash function">
            <Select
              floatingLabelText="Digest Function"
              defaultValue={options.function}
              onChange={e => options.function = e}
              style={{ width: 200 }}
            >
              <Select.Option value={"javascript"}>Javascript</Select.Option>
              <Select.Option value={"md4"}>MD4 (128-bit)</Select.Option>
              <Select.Option value={"md5"} >MD5 (128-bit)</Select.Option>
            </Select>
          </Form.Item>
        );
      },
      'process': (input,options) => {
        //              <Select.Option value={"sha1"} >SHA1 (160-bit)</Select.Option>
        //              <Select.Option value={"sha-256"}>SHA-256 (256-bit)</Select.Option>
        //              <Select.Option value={"sha-512"}>SHA-512 (512-bit)</Select.Option>
        if (options.function === 'md5')
          return hash_md5(input);
        if (options.function === 'sha1')
          return hash_sha1(input)
        return hash_string(input);
      }
    },
    {'label':'Excel to CSV','tags':['substring'],'hint':'Not implemented yet','options':{}},
    {'label':'XML to JSON','tags':[],'hint':'Not implemented yet','options':{}},
    {'label':'JSON to XML','tags':[],'hint':'Not implemented yet','options':{'ident':'\t'}},
    {'label':'Ident','tags':[],'hint':'Not implemented yet','options':{'ident':'\t'}},
    {
      'label':'TitleCase',
      'options':{'ignore':"a abaft about above afore after along amid among an apud as aside at atop below but by circa down for from given in into lest like mid midst minus near next of off on onto out over pace past per plus pro qua round sans save since than thru till times to under until unto up upon via vice with worth the and nor or yet so"},
    },
  ]
}
