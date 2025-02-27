document.addEventListener('DOMContentLoaded', function() {
    let clientWidth = document.getElementById('content').clientWidth;
    let graphContainer = document.getElementById('catastrophe_diagram');
    main(graphContainer, clientWidth);
});
function main(container, clientWidth)
{
    if (!mxClient.isBrowserSupported())
    {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    }
    else
    {
        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);

        // Creates the graph inside the given container
        var graph = new mxGraph(container);
        graph.htmlLabels = true;
        graph.vertexLabelsMovable = true;

        graph.isWrapping = function (cell) {
            return this.model.isCollapsed(cell);
        };

        // Enables rubberband selection
        new mxRubberband(graph);
        let parent = graph.getDefaultParent();
        graph.keepEdgesInBackground = true;

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try
        {
            let varH = 50;
            let varX2 = clientWidth-450;
            let thrW = clientWidth/2-150;
            let thrH = 100;
            let edgeColor = "#000";
            configEdgeStyle(graph, edgeColor);

            let shared_variables = document.getElementById('shared_variables').getElementsByClassName('shared_variables_tech')[0].getElementsByClassName('var_name');
            for (let j = 0; j < shared_variables.length; j++){
                let techData =  shared_variables[j];
                let varText = techData.innerHTML.replace(/ /g, '');
                let varW = (j+1)%2 === 0 ? varX2 : 10;
                varH = (j+1)%2 === 0 ? varH : varH += 200;
                nodeStyle(graph, "variable");
                let varNode = graph.insertVertex(parent, null, varText, varW, varH, 120, 100, "variable");
            }
            let VarCells = graph.getChildVertices(graph.getDefaultParent());
            let thread_list = document.getElementById('thread_ids_textual').getElementsByClassName('threads_ids_tech')[0].getElementsByClassName('thread_id');
            for (let thread of thread_list){
                let threadVarList = [];
                let threadId = thread.innerHTML.replace(/ /g, '');
                let threadVarElement = document.getElementById(threadId).getElementsByClassName('var_child');
                for (let threadVar of threadVarElement){
                    threadVarList.push(threadVar.innerHTML.replace(/ /g, ''));
                }
                nodeStyle(graph, "thread");
                let thrNode = graph.insertVertex(parent, threadId, threadId, thrW, thrH, 150, 100, "thread");
                thrH += 200;
                VarCells.forEach(function (node) {
                    if (node['style'] === 'variable' && threadVarList.includes(node['value'])){
                        graph.insertEdge(parent, null, null, thrNode, node, 'dashed=0;'+
                          'endArrow=open;startFill=0;endFill=0;' +
                          'endSize=8;');
                    }
                })
            }
        }
        finally
        {
            // Updates the display
            graph.getModel().endUpdate();
        }
    }
}

