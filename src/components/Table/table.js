import React, {useEffect, useState} from 'react';
import "./table.css"

function Table(props) {
    const [columns, setColumns] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setColumns(props.columns);
        setDataSource(formatData())
        setLoading(props.loading)
    }, [props]);

    const formatData = _ => {
        const source = []
        for(let i = 0; i<props.dataSource.length; i++){
            const tempSource = []
            for(let j = 0; j<props.columns.length; j++){
                tempSource.push(
                    props.dataSource[i][props.columns[j].key]
                )
            }
            source.push(tempSource)
        }
        return source;
    };

    return (
        <div className="adx-table">
            <div className="table">
                <div className={`loading ${loading ? "" : "hide"}`}>
                    <div className="loader"/>
                </div>
                <div className="thead">
                    {columns.map((item, index) => (
                        <div className="th" key={index}>{item.title}</div>
                    ))}
                </div>
                <div className="tbody">
                {dataSource.map((item, index) => (
                    <div className="tr" key={index}>
                        {item.map((content, key) => (
                            <div className="td" key={key}>{content}</div>
                        ))}
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default Table;