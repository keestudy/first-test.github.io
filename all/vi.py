import rdflib
import streamlit as st
from streamlit_agraph import agraph, Node, Edge, Config
import re

g = rdflib.Graph()
g.parse(r"D:\学习\notebook\上海地名\上海地名沿革信息.rdf", format='turtle')

# 创建节点样式字典，根据命名空间设置不同的颜色
node_styles = {
    "http://geocode.org/Place/": {"color": "red"},
    "http://geocode.org/NS/": {"color": "blue"},
    "http://geocode.org/Event/": {"color": "yellow"},
    # 添加其他命名空间及其颜色
}

nodes=[]
edges=[]
ids = []

pattern = r'http://geocode.org/(.*)/'



# 遍历RDF图中的三元组
for subj, pred, obj in g:
    #print(subj)
    #print('a')
    # 添加主语节点
    subj0 = rdflib.namespace.split_uri(subj)[-1]
    #print(subj0)
    #print('b')
    if subj0 not in ids:
        ids.append(subj0)
        if subj0 not in nodes:
            match = re.search(pattern, subj)
            if match:
                namespace001 = match.group(1)
                namespace1 = 'http://geocode.org/'+namespace001+'/'
                style = node_styles.get(namespace1, {})  # 获取节点的样式
                nodes.append(Node(subj0, label=subj0, **style))
    try:
        obj = rdflib.namespace.split_uri(obj)[-1]
    except:
        obj = str(obj)
    obj0 = obj
    if obj0 not in ids:
        ids.append(obj0)
        # 添加宾语节点
        if obj0 not in nodes:
            match = re.search(pattern, obj)
            if match:
                namespace001 = match.group(1)
                namespace1 = 'http://geocode.org/'+namespace001+'/'
                style = node_styles.get(namespace1, {})  # 获取节点的样式
                nodes.append(Node(obj0, label=obj0, **style))
            
    pred0 = rdflib.namespace.split_uri(pred)[-1]
    edges.append(Edge(source=subj0, 
                      label=pred0, 
                      target=obj0)) 
config = Config(width=1800,
                height=900,
                directed=True, 
                physics=True, 
                hierarchical=True,
                )
    
agraph(nodes,edges,config)