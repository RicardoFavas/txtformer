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

const configs = {
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
            let result = Papa.parse(input,configs.xlsConfigs);
            result = Papa.unparse(result.data,configs.csvConfigs);
            return result;
        }
    },
    {
      'label':'Costume Script',
      'tags':['javascript','ecmascript'],
      'hint':'Costume Script in Javasscript',
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
