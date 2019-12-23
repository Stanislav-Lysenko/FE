let mock = JSON.parse(data);
renderHTML(mock, document.body);

function addTextNode(text) {
  let newtext = document.createTextNode(text);
  return newtext;
}

function setAttr(item, htmlElement){
	for (key in item){
		if (key != "text" && key != "tag" && key != "html" && key != "text" && key != "children") {
			htmlElement.setAttribute(key, item[key]);
		}
	}
}

function renderHTML(element, parent){
	//if it is the deepest tag element
	if (!Array.isArray(element) && !element.children) {
		if (element.text) {
			return parent.append(addTextNode(element.text));
		} else {
			let htmlElem = document.createElement(element.tag);
			//add attributes
			setAttr(element,htmlElem);

			htmlElem.append(addTextNode(element.html));
			return parent.appendChild(htmlElem);
		}
	} else {
		element.forEach((item)=> {
			if (item.children) {
				let htmlElem = document.createElement(item.tag);
				//add attributes
				setAttr(item, htmlElem);

				parent.appendChild(htmlElem);
				renderHTML(item.children, htmlElem);
			} else {
				renderHTML(item, parent);
			}
		})
	}
}


