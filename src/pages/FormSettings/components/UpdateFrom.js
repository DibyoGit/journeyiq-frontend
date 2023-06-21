import React, { useRef, useState } from "react";
import Card from "../../../component/sharedComponent/Card/Card";
import { Button, Input, Collapse, Checkbox } from 'antd';
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import { GET_FORMS, UPDATE_FORMS} from '../../../api/api';

const { Panel } = Collapse;

function UpdateFrom(props) {

    const [url, setUrl] = useState();
    const [forms, setForms] = useState(null);
    const [newForms, setNewForms] = useState({});
    
   const {formSettingsref} = props

   const formsRef = useRef(null)

    const handleCheckboxChange = (event, index) => {
       /*  console.log(index, event.target.checked) */
        // Update the state with the new checked item
        const newCheckBoxes = [...newForms];
        newCheckBoxes[index].form_enabled = !newCheckBoxes[index].form_enabled;
        setNewForms(newCheckBoxes);
    }
    
    const handleChildChange = (event, index, index2, type) => {
       /*  console.log(index, index2, event.target.checked) */
        // Update the state with the new checked item
        const newCheckBoxes = [...newForms];
        if(type==='isChecked'){
            newCheckBoxes[index].fields[index2].isChecked = !newCheckBoxes[index].fields[index2].isChecked;
        }else{
            newCheckBoxes[index].fields[index2].label = event.target.value;
        }
        setNewForms(newCheckBoxes);
    }

    const genExtra = () => (
        <MdEdit
            onClick={(event) => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        />
    );

    const collapseHeader = (form, index) => (
        <Checkbox
            checked={newForms[index].form_enabled}
            onChange={(event) => handleCheckboxChange(event, index)}
        >
            {form.form_label}
        </Checkbox>
    )

    const getforms = async (val) => {
        try {

            const formsData = await axios.post(GET_FORMS, { domainUrl: val });
            if (formsData.data.data) {
                setForms(formsData.data.data);
                setNewForms(formsData.data.data);

                
            }
            formsRef.current.scrollIntoView() 

        } catch (error) {
            console.log('error: ', error);
        }
       
    }

    const loadPage = (val) => {
        window.open(val, "_blank");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted:", newForms);
        try {

            const formsUpdate = await axios.post(UPDATE_FORMS, newForms);
            if (formsUpdate.data.error===0) {
                alert('Update Successfully');
            }

        } catch (error) {
            console.log('error: ', error);
        }
    };

    const handleSelectChange = (val) => {
        props.onEdit(val);
    }

    return (
        <div className="p-4 ">
            <div className="flex flex-col gap-2">
                <div className="flex  justify-between items-center ">
                    <h1 className="text-sm font-semibold text-sky-800 uppercase">
                        Form Settings
                    </h1>
                </div>
                <Card>
                    <div className='p-5'>
                        <div className='flex flex-row justify-between'  ref={formSettingsref} >
                            <Input
                                size='large'
                                placeholder='Page URL'
                                value={props.domainUrl}
                                onChange={(e) => handleSelectChange(e.target.value)}
                                style={{
                                    borderRadius: 0
                                }}
                               
                            />
                        </div>
                        <div className='mt-5 space-x-2'>
                            <Button
                                type='primary'
                                className='rounded bg-blue-600'
                                onClick={() => loadPage(props.domainUrl)}
                            >
                                Load Page
                            </Button>
                            <Button
                                type='primary'
                                className='rounded bg-blue-600'
                                onClick={() => getforms(props.domainUrl) }
                            >
                                Scan Page
                            </Button>
                        </div>
                        <Card propsStyle='mt-5 bg-stone-200 border border-slate-300 p-3'>
                            <ul className='leading-6 list-disc text-sm text-slate-500 pl-10'>
                                <li>Copy & Paste your page URL</li>
                                <li>Click on Load Page button to track the page formsL</li>
                                <li>Once page is loaded successfully click on scan page</li>
                                <li>You can see the form details</li>
                            </ul>
                        </Card>
                        <div  >
                        {forms?.length > 0 &&
                            <div className='mt-5'>
                                <h1 className="text-sm font-semibold text-sky-800 uppercase">
                                    Forms
                                </h1>
                                <form className='mt-5' onSubmit={handleSubmit}>
                                    <Collapse
                                        accordion
                                        expandIconPosition="end"
                                    >
                                        {
                                            forms?.map((form, key) => {
                                                const formFields = form.fields;
                                                return (
                                                    <Panel header={collapseHeader(form, key)} key={key + 1} extra={genExtra()}>
                                                        {formFields?.map((field, key2) => {
                                                            return (
                                                                <div className="flex space-x-4 mt-2" key={key2}>
                                                                    <Checkbox
                                                                        checked={newForms[key].fields[key2].isChecked}
                                                                        onChange={(event) => handleChildChange(event, key, key2, 'isChecked')}
                                                                    ></Checkbox>
                                                                    <input
                                                                        value={field.name}
                                                                        className="border border-solid border-slate-300 px-1"
                                                                        disabled
                                                                    />
                                                                    <input
                                                                        value={newForms[key].fields[key2].label}
                                                                        onChange={(event) => handleChildChange(event, key, key2, 'label')}
                                                                        className="border border-solid border-slate-300 px-1"
                                                                    />
                                                                </div>
                                                            )
                                                        })}
                                                    </Panel>
                                                )
                                            })
                                        }
                                    </Collapse>
                                    <Button
                                        type='primary'
                                        htmlType="submit"
                                        className='rounded bg-blue-600 mt-3'
                                        
                                    >
                                        Save
                                    </Button>
                                    
                                </form>
                            </div>
                        }
                        </div>
                        <span ref={formsRef} ></span>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UpdateFrom