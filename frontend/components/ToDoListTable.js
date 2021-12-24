import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Table.module.css'
import Api from "../core/api"


export default class ToDoListTable extends React.Component{
    async delete(id){
        this.props.fnDeleteValue(id);
    }
    render()
    {
        return (
            <ul className={styles.responsiveTable} border="2">
                {
                    (this.props.headers)
                    ?   
                        <li className={styles.tableHeader}>
                            {
                                this.props.headers.map((header,idx)=>{
                                    return (
                                        <span key={`header_${idx}`} className={styles.col}>
                                            {header}
                                        </span>
                                    )
                                })
                            }
                        </li>
                    : null
                }
                {
                    (this.props.values)
                    ?

                        this.props.values.map((value,idx)=>{
                            return (
                                <li className={styles.tableRow} key={`value_${idx}`} id={`recordRow_${value._id}`} >
                                    <span className={styles.col}>
                                            {value._id}
                                    </span>
                                    <span className={styles.col}>{value.text}</span>
                                    <span className={styles.col}>
                                        <button 
                                            onClick={(e)=>{
                                                let id = e.target.parentElement.parentElement.id.split('_')[1];
                                                this.delete.bind(this);
                                                this.delete(id);
                                            }}
                                            className={styles.deleteBtn}
                                        >
                                            Delete 
                                        </button>
                                    </span>        
                                        
                                </li>
                            )
                        })
                            
                        
                    : null
                }
                
            </ul>
        )
    }
}