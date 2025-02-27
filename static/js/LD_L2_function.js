document.addEventListener('DOMContentLoaded', function() {
    if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    }
    document.getElementById('tab04').style.display = 'block';
    document.getElementById('for_tab04').classList.add("is-active");
    document.getElementById('for_tab03').classList.remove("is-active");
    let ldL2GraphContainer = document.getElementById('logical_data_l2_function_diagram');
    let ldL1GraphContainer = document.getElementById('logical_data_l1_function_diagram');
    let circularGraphContainer = document.getElementById('function_circular_diagram');
    //let clientWidth = document.documentElement.clientWidth;
    let clientWidth = document.getElementById('content').clientWidth;
    let ldName = get_node_name();
    if (ldName !== null){
        document.getElementById('tab04').style.display = 'block';
        document.getElementById('tab03').style.display = 'none';
        document.getElementById('for_tab03').classList.remove("is-active");
        document.getElementById('for_tab04').classList.add("is-active");
    }
    logicalDataL2Function(ldL2GraphContainer, clientWidth, ldName);
    logicalDataL1Function(ldL1GraphContainer, clientWidth, ldName);
    circularLogicalDataFunction(circularGraphContainer, ldName);
});
function logicalDataL2Function(container, clientWidth, ldName) {

    // Disables the built-in context menu
    mxEvent.disableContextMenu(container);
    // Creates the graph inside the given container
    var graph = new mxGraph(container);
    //graph.setEnabled(false);
    // graph.getStylesheet().getDefaultEdgeStyle();
    // Enables rubberband selection
    new mxRubberband(graph);
    var parent = graph.getDefaultParent();
    graph.keepEdgesInBackground = true;
    // Adds cells to the model in a single step
    graph.getModel().beginUpdate();
    configEdgeStyle(graph, "#000000");
    try {
        let lcX = clientWidth/2-150;
        let varX2 = clientWidth-250;
        let funX2 = clientWidth-250;
        let lcY = 100;
        let funX = 50;
        let funY = 100;
        let varY = 100;
        let varX = 0;
        let styleIdNode = null;
        let strokeColor = null;
        let nodeSize = {};
        let functionContainer = document.getElementById('function_circular_textual').getElementsByClassName('li-list_level0');
        let lcContainer = document.getElementById('all_lc_accessed_nested_function').getElementsByClassName('li-list_level1');
        // draw logical components
        for (let lc of lcContainer){
            let lcName = lc.innerHTML.replace(/ /g, '');
            nodeSize = setNodeSize(lcName, 'LogicalComp' );
            nodeStyle(graph, nodeSize['nodeIdText']);
            // console.table(nodeSize);
            graph.insertVertex(parent, null, lcName, lcX, lcY, nodeSize['Width'], nodeSize['Height'], nodeSize['nodeIdText']);
            lcY += (lcName.length > 20)? 120 : 100;
        }
        let mxCells = graph.getChildVertices(graph.getDefaultParent());
        let lcName = null;
        //for (const [i, elm] of functionContainer.entries()) {
        for (let i = 0; i < functionContainer.length; i++) {
            let varLcList = [];
            let elm = functionContainer[i];
            let funcVarlist = elm.getElementsByClassName("list_level1")[0];
            let funcVarElemts = funcVarlist.getElementsByClassName('VarList')[0].getElementsByClassName('Var_op_list');
            if (funcVarElemts.length === 0){
                let funcThreadElemnts = funcVarlist.getElementsByClassName('LogicalComponets')[0].getElementsByClassName('value');
                let lcVarType = funcVarElemts[0].getElementsByClassName('value')[0].innerHTML.replace(/ /g, '');
                for (let r of funcThreadElemnts){
                    varLcList.push([r.innerHTML.replace(/ /g, ''), lcVarType]);
                }
                // console.log("varLcList...", varLcList);
                let varNameS = funcVarElemts[0].getElementsByClassName('key')[0].innerHTML.replace(/ /g, '');
                let opTyp = funcVarElemts[0].getElementsByClassName('value')[0].innerHTML.replace(/ /g, '');
                let varName = (varNameS.includes("."))? varNameS.split(".")[0]: varNameS;
                let varTyp = (varNameS.includes("."))? "logicalData": "variable";
                if (opTyp === "STORE"){
                    varTyp += "_W";
                }else if (opTyp === "LOAD"){
                    varTyp += "_R";
                }else if (opTyp === "PROCESS"){
                    varTyp += "_P";
                }
                nodeSize = setNodeSize(varName, varTyp);
                nodeStyle(graph, nodeSize['nodeIdText']);

                varX = (i+1)%2 === 0 ? varX2 : 50;
                varY += 20;
                let UpdatedCells = graph.getChildVertices(graph.getDefaultParent());
                let count = 0;
                let varNode = null;
                UpdatedCells.forEach(function (node) {
                   if (node['value'] === varName){
                       count +=1;
                       varNode = node;
                   }
                });
                if (count === 0){
                    varNode = graph.insertVertex(parent, null, varName, varX, varY, nodeSize['Width'], nodeSize['Height'], nodeSize['nodeIdText']);
                }
                for (let item of varLcList){
                    //console.log("item __________________  " + item);
                    mxCells.forEach(function (node) {
                        if(node['style'].includes('LogicalComp') &&  item[0] === node['value']){
                            let endArrowStyle = (item[1] === "STORE" || item[1] === "PROCESS")? "classic" : "0";
                            let startArrowStyle = (item[1] === "LOAD" || item[1] === "PROCESS")? "classic" : "0";
                            let startSizeStyle = (item[1] === "PROCESS")? "10" : "7";

                            graph.insertEdge(parent, null, null, node, varNode, 'dashed=0;endArrow='+ endArrowStyle +';startArrow='+ startArrowStyle +';sourcePerimeterSpacing=0;startFill=1;endFill=1;endSize=7;startSize='+startSizeStyle+';' + strokeColor);
                            node.source = varNode;
                            varNode.source = node;

                        }
                    });
                }
            }else if (funcVarElemts.length > 0){
                let funLcList = [];
                let fun_name = elm.getElementsByClassName('func_name')[0].innerHTML.replace(/ /g, '');
                let funLcTags = elm.getElementsByClassName('list_level1')[0].getElementsByClassName('LogicalComponets')[0].getElementsByClassName('value');
                // console.log(fun_name);
                // console.log(funLcTags);
                for (let lc of funLcTags){
                    lcName = lc.innerHTML.replace(/ /g, '');
                    funLcList.push(lcName);
                }
                if (ldName !== null && ldName !== fun_name) {
                    styleIdNode = "LogicalDataInactive";
                    strokeColor = "strokeColor=#ccc;";
                } else {
                    styleIdNode = "logicalData";
                    strokeColor = "strokeColor=#000000;";
                }
                nodeSize = setNodeSize(fun_name, styleIdNode );
                nodeStyle(graph, nodeSize['nodeIdText']);

                funX = (i+1)%2 === 0 ? funX2 : 50;
                funY = (i+1)%2 === 0 ? funY : funY += 100;

                let funNode = graph.insertVertex(parent, null, fun_name + "()", funX, funY, nodeSize['Width'], nodeSize['Height'], nodeSize['nodeIdText']);
                // funY += 200;
                // Connecting each function node to its logical components

                // console.log( fun_name + "  -----  " + funY);
                mxCells.forEach(function (node) {
                    if(node['style'].includes('LogicalComp') && funLcList.includes(node['value'])){
                        graph.insertEdge(parent, null, null, node, funNode, 'dashed=0;endArrow=oval;startArrow=oval;sourcePerimeterSpacing=0;startFill=1;endFill=1;endSize=10;startSize=10;' + strokeColor);
                        node.source = funNode;
                        funNode.source = node;
                    }
                });
                let ldUlrPath = "http://127.0.0.1:8000/operation_functions_L2";
                let lcUlrPath = "http://127.0.0.1:8000/logical_comp";
                ldLcGraphDoubleClickEvent(graph, ldUlrPath, lcUlrPath);
            }
        }
    }finally{
        // Updates the display
        graph.getModel().endUpdate();
        let AllCells = graph.getChildVertices(graph.getDefaultParent());
        let ElementsNo = document.getElementById('ElementsNo');
        if (ElementsNo.innerText.replace(/ /g, '') !== AllCells.length){
            ElementsNo.innerText = AllCells.length;
            console.log(ElementsNo.innerText);
        }
    }
}
function logicalDataL1Function(container, clientWidth, ldName) {
    // Disables the built-in context menu
    mxEvent.disableContextMenu(container);
    // Creates the graph inside the given container
    var graph = new mxGraph(container);
    //graph.setEnabled(false);
    // graph.getStylesheet().getDefaultEdgeStyle();
    // Enables rubberband selection
    new mxRubberband(graph);
    var parent = graph.getDefaultParent();
    graph.keepEdgesInBackground = true;
    // Adds cells to the model in a single step
    graph.getModel().beginUpdate();
    configEdgeStyle(graph, "#000000");
    try {
        let funX = clientWidth/2-150;
        let varX2 = clientWidth-250;
        let varX = 50;
        let varY = 100;
        let funY = 100;
        let styleIdNode = null;
        let strokeColor = null;
        let nodeSize = {};
        let variableContainer = document.getElementById('all_var_accessed');
        let variableList = variableContainer.getElementsByClassName("li-list_level1");

        for (let i = 0; i < variableList.length; i++){
            let vElement = variableList[i];
            let elementText = vElement.innerHTML;
            let varText = elementText.includes(".")? elementText.split(".")[0] : elementText;
            let varType = elementText.includes(".")? "logicalData" : "variable";
            // console.log(varText);
            nodeSize = setNodeSize(varText, varType );
            nodeStyle(graph, nodeSize['nodeIdText']);
            // console.table(nodeSize);
            varX = (i+1)%2 === 0 ? varX2 : 50;
            varY = (i+1)%2 === 0 ? varY : varY += 150;
            graph.insertVertex(parent, null, varText, varX, varY, nodeSize['Width'], nodeSize['Height'], nodeSize['nodeIdText']);
        }
        let mxCells = graph.getChildVertices(graph.getDefaultParent());
        let functionContainer = document.getElementById('function_circular_textual').getElementsByClassName('li-list_level0');

        let fun_name = null;
        for (let elm of functionContainer) {
            fun_name = elm.getElementsByClassName('func_name')[0].innerHTML;
            let funVarElements = elm.getElementsByClassName('list_level1')[0].getElementsByClassName('VarList')[0].getElementsByClassName('Var_op_list');
            let funVarList = [];
            for (let element of funVarElements){
                let varName =  element.getElementsByClassName('key')[0].innerHTML.replace(/ /g,'');
                let varAcessTyp =  element.getElementsByClassName('value')[0].innerHTML.replace(/ /g,'');
                funVarList.push([varName.includes('.')? varName.split(".")[0]: varName, varAcessTyp]);
            }
            if (ldName !== null && ldName !== fun_name + "()") {
                styleIdNode = "LogicalDataInactive";
                strokeColor = "strokeColor=#ccc;";
            } else {
                styleIdNode = "logicalData";
                strokeColor = "strokeColor=#000000;";
            }
            nodeSize = setNodeSize(fun_name, styleIdNode );
            nodeStyle(graph, nodeSize['nodeIdText']);
            let funNode = graph.insertVertex(parent, 'function_ld_'+fun_name, fun_name + "()", funX, funY, nodeSize['Width'], nodeSize['Height'], nodeSize['nodeIdText']);
            funY += 200;
            for (let item of funVarList){
                mxCells.forEach(function (node){
                    let nodeValue = node['value'].split("(")[0];
                    if(item[0] === nodeValue){
                        let endArrowStyle = (item[1] === "LOAD" || item[1] === "PROCESS")? "classic" : "0";
                        let startArrowStyle = (item[1] === "STORE" || item[1] === "PROCESS")? "classic" : "0";
                        let startSizeStyle = (item[1] === "PROCESS")? "10" : "7";
                        let edgeVal = (ldName !== null && ldName !== fun_name + "()") ? null : item[1];
                        graph.insertEdge(parent, null, edgeVal, node, funNode, 'dashed=0;endArrow='+ endArrowStyle +';startArrow='+ startArrowStyle +';sourcePerimeterSpacing=0;startFill=1;endFill=1;endSize=7;startSize='+startSizeStyle+';' + strokeColor);

                        //graph.insertEdge(parent, null, null, node, funNode, 'dashed=0;endArrow=diamondThin;sourcePerimeterSpacing=0;endFill=1;'+ strokeColor);
                        node.source = funNode;
                        funNode.source = node;
                    }
                });
            }
            let tdUlrPath = "http://127.0.0.1:8000/Logical_Data_L1";
            let ldUrlPath = "http://127.0.0.1:8000/operation_functions_L2";
            ldTdGraphDoubleClickEvent(graph, tdUlrPath, ldUrlPath);
        }
    }finally{
        // Updates the display
        graph.getModel().endUpdate();
    }
}

function circularLogicalDataFunction(container, ldName) {
    if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    } else {
        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);

        // Creates the graph inside the given container
        var graph = new mxGraph(container);
        //graph.setEnabled(false);
        // graph.getStylesheet().getDefaultEdgeStyle();
        // Enables rubberband selection
        new mxRubberband(graph);
        var parent = graph.getDefaultParent();
        graph.keepEdgesInBackground = true;
        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        configEdgeStyle(graph, "#000000");
        try {
            let stX = null;
            let stY = null;
            let styleIdNode = null;
            let nodeSize = {};
            let strokeColor = null;
            let ldL2List = document.getElementById("function_circular_textual").getElementsByClassName("li-list_level0");
            for (let i=0; i < ldL2List.length; i++){
                let ldtext = ldL2List[i].firstElementChild.innerHTML.replace(/ /g,'');
                let varList = ldL2List[i].getElementsByClassName("list_level1")[0].getElementsByClassName("VarList")[0].getElementsByClassName('value');
                let stId = 'ldL2_' + i;
                if (ldName !== null && ldName !== ldtext){
                    styleIdNode = "LogicalDataInactive";
                    strokeColor = "#ccc";
                }else{
                    styleIdNode = "logicalData";
                    strokeColor = "#000000";
                }
                // console.table([thrFunc, lcName, styleIdNode]);
                nodeStyle(graph, styleIdNode);
                nodeSize = setNodeSize(ldtext, styleIdNode );
                if (i === 0){
                        stX = 200;
                        stY = 300;
                }else if (i%2 === 0) {
                    stX = 200;
                    stY += 500;
                }else if (i !== 0 && varList.length <= 4){
                    stX += 600;
                }else{
                    stY += 400;
                    stX = 200;
                }
                let stNode = graph.insertVertex(parent, stId, ldtext, stX, stY, nodeSize['Width'], nodeSize['Height'], nodeSize['nodeIdText']);
                // console.log("___________  " + ldtext);
                //drawTdForLd(graph, parent, stNode, varList, null, ulrParam, strokeColor);
                // drawChild(graph, parent, stNode, varList, 'diamondThin', '1', 0, 'variable');
            }

        }finally{
            // Updates the display
            graph.getModel().endUpdate();

        }
    }
    
}