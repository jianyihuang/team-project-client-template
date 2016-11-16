import React from 'react';

export class DropDown extends React.Component {

  function showselection()
  {
    var frm = document.getElementById('classes');
    var opt = frm.selClass

    var numofoptions = opt.length;
    var selValue = new Array;

    var j = 0
    for (i=0; i<numofoptions; i++)
    {
      if (opt[i].selected === true)
      {
        selValue[j] = opt[i].value
        j++
      }
    }

    selValue = selValue.join(" ")

    document.getElementById("txtEditions").innerHTML = selValue
  }

  render(){
    return (
      <form method=POST name='classes'>
        <select name='selClass' multiple onchange={this.showselection}>
          <option value="one">math</option>
          <option value="two">bio</option>
          <option value="three">english</option>
        </select>
        <textarea id="txtEditions"></textarea>
      </form>
    )
  }
}
