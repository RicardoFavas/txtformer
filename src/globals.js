import React from 'react';
import _ from 'lodash';
import Papa from 'papaparse';


function convertToalphabet(num) {
    let mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? convertToalphabet(pow) + out : out;
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
      'process': (input,options) => input.replace(options.pattern,options.replacement),
      'options':{'pattern':'','replacement':''},
      'optionsDialog':
        (options) => {
          return (
            <div>
              <div>
                <span>Find what: </span>
                <span><input type='input' placeholder=""
                  defaultValue={options.pattern} onChange={e => options.pattern = e.target.value}/></span>
              </div>
              <div>
                <span>Replace with: </span>
                <span><input type='input' placeholder="" defaultValue={options.replacement} onChange={e => options.replacement = e.target.value}/></span>
              </div>
            </div>
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
      'process': (input,options) => input.replace("'","''"),
    },
    {
      'label':'SQL Unescape',
      'hint': (<div>SQL Escape: replace all instances of '' with '</div>),
      'process': (input,options) => input.replace("''","'"),
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
                n = convertToalphabet(n);
              else if (options.countMode === 'Alphabetic')
                n = convertToalphabet(n);
              return n+options.separator+l;
            }
          ).join('\n')
        },
      'optionsDialog':
        (options) => {
          return (
            <div>
              <label className="pt-label pt-inline">
                Separator
                <input className="pt-input" type="text" dir="auto" defaultValue={options.separator} onChange={e => options.separator = e.target.value}/>
              </label>
              <div className="pt-select">
                <select defaultValue={options.countMode} onChange={e => options.countMode = e.target.value}>
                  <option value="Decimal">Decimal</option>
                  <option value="Roman">Roman</option>
                  <option value="Alphabetic">Alphabetic</option>
                </select>
              </div>
            </div>
          )
        }
    },
    {
      'label':'Join Lines',
      'options': {'separator':','},
      'process': (input,options) => input.split('\n').join(options.separator),
      'optionsDialog':
        (options) => {
          return (
            <div>
              <div>
                <span>Separator: </span>
                <span><input type='input'
                  defaultValue={options.separator} onChange={e => options.separator = e.target.value}/></span>
              </div>
            </div>
          )
        }
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
      'label':'CSV to SQL Insert',
      'tags':['insert','sql'],
      'hint':'',
      'options':{'database':'','header':false,'tablename':''},
      'optionsDialog':
        (options) => {
          return (
            <div>
              <label className="pt-label pt-inline">
                Table name
                <input className="pt-input" type="text" dir="auto" defaultValue={options.tablename} onChange={e => options.tablename = e.target.value}/>
              </label>
              <label className="pt-control pt-checkbox">
                Header
                <input type="checkbox" defaultChecked={options.header} onChange={e => options.header = !options.header}/>
                <span className="pt-control-indicator"></span>
              </label>
              {/*
              <div className="pt-select">
                <select onChange={e => options.database = e.target.value}>
                  <option selected>Chose a database</option>
                  <option value="postgresql">PostgreSQL</option>
                  <option value="sqlserver">SQLServer</option>
                  <option value="db2">DB2</option>
                  <option value="oracle">Oracle</option>
                </select>
              </div>
              */}
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
    {'label':'Remove XML Tags','tags':[],'hint':'Removes XML tags from the document','options':{},'process': (input,options) => input.replace(/(<([^>]+)>)/ig,"")},











    {'label':'IteratingCase','tags':[],'hint':'Not implemented yet'},
    {
      'label':'Filter Lines',
      'tags':['remove',],
      'hint':'Not implemented yet',
      'options':{'pattern':'','regex':false,'ci':true}
    },
    {'label':'Remove Lines','tags':['hex'],'hint':'Not implemented yet','options':{'from':0,'to':0,'length':0}},
    {'label':'Hex Decimal','tags':['hex'],'hint':'Not implemented yet'},
    {'label':'Binary','tags':[],'hint':'Not implemented yet'},
    {'label':'Decimal','tags':[],'hint':'Not implemented yet'},
    {'label':'ROT13','tags':[],'hint':'Not implemented yet'},
    {'label':'Slice Lines','tags':['substring'],'hint':'Not implemented yet','options':{'start':0,'end':0,'length':0}},
    {'label':'Slice Document','tags':['substring'],'hint':'Not implemented yet','options':{'start':0,'end':0,'length':0}},
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
