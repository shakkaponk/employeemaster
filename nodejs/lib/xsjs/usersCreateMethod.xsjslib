/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

// $.import("user.xsjs", "session");
// var SESSIONINFO = $.user.xsjs.session;

/**
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/

/*********************************************************************************************************:::::::::*/

/**  
@function Outputs the Session user and Language as JSON in the Response body
*/

/**
@function Escape Special Characters in JSON strings
@param {string} input - Input String
@returns {string} the same string as the input but now escaped
*/
function escapeSpecialChars(input) {
	if(typeof(input) != 'undefined' && input != null)
	{
	return input
    .replace(/[\\]/g, '\\\\')
    .replace(/[\"]/g, '\\\"')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t'); }
	else{

		return "";
	}
}

/**
@function Converts any XSJS RecordSet object to a Text String output
@param {object} rs - XSJS Record Set object
@param {optional Boolean} bHeaders - defines if you want column headers output as well; defaults to true
@param {optional String} delimiter - supplies the delimiter used between columns; defaults to tab (\\t)
@returns {String} The text string with the contents of the record set
*/

/**
@function Converts any XSJS RecordSet object to a JSON Object
@param {object} rs - XSJS Record Set object
@param {optional String} rsName - name of the record set object in the JSON
@returns {object} JSON representation of the record set data
*/

/***************************************************************************************************::::*/



function usersCreate(param){
	var after = param.afterTableName;    

	//Get Input New Record Values
// 	var	pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
// 	var rs = pStmt.executeQuery();
// 		var User = recordSetToJSON(rs, "Details");

// 	// var User = recordSetToJSON(pStmt.executeQuery(), "Details");
// 	pStmt.close();
// rs.close();

var stmt = 'select * from "'+ param.afterTableName + '"', 
    xStmt = param.connection.prepareStatement( stmt ).executeQuery(), 
    data = xStmt._rows; //it has data in it in format [0, "k", "a", "k.a"] 
   var	columnNames = xStmt._columnInfo; //it has column Names
	var tDict = {};
	//Now form the dict as not everytime user sends the data in order
	for(var i=0;i<columnNames.length;i++) //columns loop
	{ 
		for(var k=0;k<data.length;k++) //data loop
		{
					tDict[columnNames[i].originalColumnName] = data[k][i];

		}
		
	}


	// // //Get Next Personnel Number
	pStmt = param.connection.prepareStatement("select \"userSeqId\".NEXTVAL from dummy");
	var rs = pStmt.executeQuery();
	var PersNo = "";
	while (rs.next()) {
		PersNo = rs.getInteger(1);
	}
	pStmt.close();
	rs.close();
	// // //Insert Record into DB Table and Temp Output Table
		var pStmt;
			pStmt = param.connection.prepareStatement("insert into \"UserData.User\" values(?,?,?,?)" );			
	
		pStmt.setInteger(1, PersNo);
		pStmt.setString(2, tDict.FirstName);		pStmt.setString(3, tDict.LastName);
		pStmt.setString(4, tDict.Email);
		pStmt.executeUpdate();
		pStmt.close();
	
}

