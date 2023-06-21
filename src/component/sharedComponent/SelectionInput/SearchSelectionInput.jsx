import React, { useEffect, useState } from 'react'
import { cmsApi } from '../../../api/api';
import axios from '../../../api/axios';
import styles from './SearchSelectionInput.module.scss';



function SearchSelectionInput({ setValue, title,  id, url, packageDetail }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [FilterData, setFilterData] = useState([]);
    const [res, setRes] = useState({});
    const [flag, setFlag] = useState(false);

    function onChangeHandler(e) {
        setSearchQuery(e.target.value);


    }

   
    const setlist = async () => {

        const data = {
            [id]: searchQuery,
            created_by: "2afjka343jaerfteyaeyhhjmg4faj"
        }
        try {
            return await axios.post(url.CREATE, data);

        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        const getlist = async () => {

            try {
                const { data } = await axios.get(url.FETCH);
                setRes(data);
            }
            catch (e) {
                console.log(e);
            }
    
        }
        getlist();
    }, [searchQuery]);



    useEffect(() => {
        if (!searchQuery) {

            setFilterData(null);

        }
        else {
            let filterData = [];
            filterData = res && res.list.filter((val) => {
                return val[id].toLowerCase().includes(searchQuery.toLowerCase());

            });

            setFilterData(filterData);
            if (filterData.length > 0 ){
               setFlag(true);
            }
            else{
                setFlag(false);
            }

        }
    }, [searchQuery]);

    const RegisterEntity = async () => {

        const { data } = await setlist();

        setValue((prev) => {

            return {
                ...prev,
                [id]:{
                _id: data[id]._id,
                [id]: data[id][id],
                }
            }
        })
        setFlag(true);
    }


    return (
        <div className={styles.SearchSelectionInput}>
            <div className={styles.selectionBox}>
                <div className={styles.group}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder={id}
                        id={id}
                        value={searchQuery}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className={styles.select}>
                    <div className={styles.selectValues}>
                        {
                            flag && FilterData && FilterData.length > 0 ?
                                FilterData.map(data => {
                                    const valueSetHandler = () => {
                                        setValue(prev => {
                                            return {
                                                ...prev,
                                                [id]: {
                                                    _id: data._id,
                                                    [id]: data[id],
                                                }
                                            }
                                        })
                                        
                                        setFilterData(null);
                                        setSearchQuery(() => {
                                            return data[id]
                                        });
                                        
                                    }
                                    return (
                                        
                                            <p className={styles.title}
                                                key={data._id}
                                                onClick={valueSetHandler}>
                                                {data[id]}</p>

                                    )
                                })
                                : !flag && searchQuery
                                &&
                                <p className={styles.title}
                                    onClick={RegisterEntity}>
                                    Create new {id}"{searchQuery}"
                                </p>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSelectionInput


/* 



*/