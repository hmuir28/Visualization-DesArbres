import React, { useEffect } from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import * as d3 from 'd3';

import ContentStyles from '../../styles/Content/ContentStyles';

const styles = StyleSheet.create(ContentStyles);

const Tree = () => {
  const vRad = 12;
  const tree = {
    cx: 300,
    cy: 30,
    w: 40,
    h: 70,
    svgW: 958,
    svgH: 460,
    vis: {},
  };

  tree.vis = {
    v: 0,
    l: '0',
    p: {
      x: tree.cx,
      y: tree.cy
    },
    c: [],
  };
  
  tree.size = 1;
  tree.glabels = [];
  tree.incMatx = [];

  tree.incX = 500;
  tree.incY = 30;
  tree.incS = 20;
  
  tree.getVertices = () => {
    const v = [];

    const getVertices = (t, f) => {	
      v.push({
        v: t.v, l: t.l, p: t.p, f: f
      });

      t.c.forEach((d) => getVertices(d, {
        v: t.v,
        p: t.p
      }));
    }
    getVertices(tree.vis, {});
    return v.sort((a,b) => a.v - b.v);
  }
  
  tree.getEdges = () => {
    const e = [];

    const getEdges = (_) => {
      _.c.forEach((d) => e.push({
        v1: _.v,
        l1: _.l,
        p1: _.p,
        v2: d.v,
        l2: d.l,
        p2: d.p
      }));

      _.c.forEach(getEdges);
    }

    getEdges(tree.vis);
    return e.sort((a,b) => a.v2 - b.v2);
  }
  
  tree.addLeaf = (_) => {
    const addLeaf = (t) => {
      if(t.v === _) { 
        t.c.push({ v:tree.size++, l: '?', p: {}, c: [] }); return; 
      }
      t.c.forEach(addLeaf);
    }

    addLeaf(tree.vis);
    reposition(tree.vis);
    if (tree.glabels.length !== 0) {
      tree.glabels = []
      relabel(
        {
          lbl:d3.range(0, tree.size).map(function(d){ return '?';}), 
          incMatx:d3.range(0,tree.size-1).map(function(){ return 0;})
        });
      d3.select("#labelnav").style('visibility','hidden');
    }
    else tree.incMatx = d3.range(0,tree.size-1).map(function(){ return 0;});
    redraw();
  }
  
  const getIncMatxRow = (i) => {
    return d3.range(0, tree.size-1-i)
      .map((d, j) => {
        let n = tree.size - 2 - i - j;
        return (tree.incMatx[i] && 1 << n) >> n; 
      });
  }
  
  tree.showLabel = (i) => {
    if (i > tree.glabels.length || i < 1) { return; } 
    
    relabel(tree.glabels[i-1]);
    redraw();
    tree.currLbl = i;
    d3.select("#labelpos").text(tree.currLbl + '/' + tree.glabels.length);
  }
  
  const relabel = (lbl) => {
    const relbl = (t) => {	t.l=lbl.lbl[t.v];	t.c.forEach(relbl);		}
    relbl(tree.vis);
    tree.incMatx = lbl.incMatx;
  }
  
  const redraw = () => {
    const edges = d3.select("#g_lines").selectAll('line').data(tree.getEdges());
    
    edges.transition().duration(500)
      .attr('x1',function(d){ return d.p1.x;}).attr('y1',function(d){ return d.p1.y;})
      .attr('x2',function(d){ return d.p2.x;}).attr('y2',function(d){ return d.p2.y;})
  
    edges.enter().append('line')
      .attr('x1',function(d){ return d.p1.x;}).attr('y1',function(d){ return d.p1.y;})
      .attr('x2',function(d){ return d.p1.x;}).attr('y2',function(d){ return d.p1.y;})
      .transition().duration(500)
      .attr('x2',function(d){ return d.p2.x;}).attr('y2',function(d){ return d.p2.y;});
      
    const circles = d3.select("#g_circles").selectAll('circle').data(tree.getVertices());

    circles.transition().duration(500).attr('cx',function(d){ return d.p.x;}).attr('cy',function(d){ return d.p.y;});
    
    circles.enter().append('circle').attr('cx',function(d){ return d.f.p.x;}).attr('cy',function(d){ return d.f.p.y;}).attr('r',vRad)
      .on('click',function(d){return tree.addLeaf(d.v);})
      .transition().duration(500).attr('cx',function(d){ return d.p.x;}).attr('cy',function(d){ return d.p.y;});
      
    const labels = d3.select("#g_labels").selectAll('text').data(tree.getVertices());
    
    labels.text(function(d){return d.l;}).transition().duration(500)
      .attr('x',function(d){ return d.p.x;}).attr('y',function(d){ return d.p.y+5;});
      
    labels.enter().append('text').attr('x',function(d){ return d.f.p.x;}).attr('y',function(d){ return d.f.p.y+5;})
      .text(function(d){return d.l;}).on('click',function(d){return tree.addLeaf(d.v);})
      .transition().duration(500)
      .attr('x',function(d){ return d.p.x;}).attr('y',function(d){ return d.p.y+5;});		
      
    const elabels = d3.select("#g_elabels").selectAll('text').data(tree.getEdges());
          
    elabels
      .attr('x',function(d){ return (d.p1.x+d.p2.x)/2+(d.p1.x < d.p2.x? 8: -8);}).attr('y',function(d){ return (d.p1.y+d.p2.y)/2;})
      .text(function(d){return tree.glabels.length === 0? '': Math.abs(d.l1 -d.l2);});	
      
    elabels.enter().append('text')
      .attr('x',function(d){ return (d.p1.x+d.p2.x)/2+(d.p1.x < d.p2.x? 8: -8);}).attr('y',function(d){ return (d.p1.y+d.p2.y)/2;})
      .text(function(d){return tree.glabels.length === 0? '': Math.abs(d.l1 -d.l2);});	
      
    
    d3.select('#incMatx').selectAll(".incrow").data(tree.incMatx)
      .enter().append('g').attr('class','incrow');
      
    d3.select('#incMatx').selectAll(".incrow").selectAll('.incRect')
      .data(function(d,i){ return getIncMatxRow(i).map(function(v,j){return {y:i, x:j, f:v};})})
      .enter().append('rect').attr('class','incRect');
      
    d3.select('#incMatx').selectAll('.incRect')
      .attr('x',function(d,i){ return (d.x+d.y)*tree.incS;}).attr('y',function(d,i){ return d.y*tree.incS;})
      .attr('width',function(){ return tree.incS;}).attr('height',function(){ return tree.incS;})
      .attr('fill',function(d){ return d.f === 1? 'black':'white'});
      
    d3.select("#incMatx").selectAll('.incrowlabel').data(d3.range(0,tree.size)).enter()
      .append('text').attr('class','incrowlabel');
      
    d3.select("#incMatx").selectAll('.incrowlabel').text(function(d){ return d;})
      .attr('x',function(d,i){ return (i-0.5)*tree.incS}).attr('y',function(d,i){ return (i+0.8)*tree.incS});
  }
  
  const getLeafCount = (_) => {
    if (_.c.length === 0) return 1;
    else return _.c.map(getLeafCount).reduce((a, b) => a + b);
  }
  
  const reposition = (v) => {
    let lC = getLeafCount(v), left=v.p.x - tree.w*(lC-1) / 2;
    v.c.forEach((d) => {
      const w = tree.w*getLeafCount(d); 
      left += w; 
      d.p = {
        x: left - (w + tree.w) / 2,
        y: v.p.y + tree.h
      };
      reposition(d);
    });		
  };
  
  return tree;
};

const initialize = (tree) => {
  d3.select(".canvas").append("div").attr('id','navdiv');
      
  d3.select("#navdiv").append("nav").attr('id','labelnav').style('display','inline-block').style('visibility','hidden');
  
  d3.select("#labelnav").append("button").attr('type','button').text('<').attr('id','prevlabel')
    .on('click', (d) => tree.showLabel(tree.currLbl === 1 ? tree.glabels.length: tree.currLbl-1));
    
  d3.select("#labelnav").append("text").text('').attr('id','labelpos');

  d3.select("#labelnav").append("button").attr('type','button').text('>').attr('id','nextlabel')
    .on('click', () => tree.showLabel(tree.currLbl === tree.glabels.length? 1: tree.currLbl+1));
          
  d3.select(".canvas").append("svg").attr("width", tree.svgW).attr("height", tree.svgH).attr('id','treesvg');

  d3.select("#treesvg").append('g').attr('id','g_lines').selectAll('line').data(tree.getEdges()).enter().append('line')
    .attr('x1', (d) => d.p1.x).attr('y1', (d) => d.p1.y)
    .attr('x2', (d) => d.p2.x).attr('y2', (d) => d.p2.y);

  d3.select("#treesvg").append('g').attr('id','g_circles').selectAll('circle').data(tree.getVertices()).enter()
    .append('circle').attr('cx',(d) => d.p.x).attr('cy', (d) => d.p.y).attr('r', tree.vRad)
    .on('click', (d) => tree.addLeaf(d.v));
    
  d3.select("#treesvg").append('g').attr('id','g_labels').selectAll('text').data(tree.getVertices()).enter().append('text')
    .attr('x', (d) => d.p.x).attr('y', (d) => d.p.y+5).text((d) => d.l)
    .on('click', (d) => tree.addLeaf(d.v));	
    
  d3.select("#treesvg").append('g').attr('id','g_elabels').selectAll('text').data(tree.getEdges()).enter().append('text')
    .attr('x', (d) => (d.p1.x+d.p2.x) / 2 + (d.p1.x < d.p2.x ? 8: -8)).attr('y', (d) => (d.p1.y+d.p2.y)/2)
    .text((d) => tree.glabels.length === 0 ? '' : Math.abs(d.l1 -d.l2));	

  tree.addLeaf(0);
  tree.addLeaf(0);
};

function ContentComponent() {

  useEffect(() => {
    const tree = Tree();
    initialize(tree);  
  }, []);

  return (
    <Column>
      <Row className={css(styles.cardsContainer)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 768: 'column' }}>
        <div className="canvas"></div>
      </Row>
    </Column>
  );
}

export default ContentComponent;
