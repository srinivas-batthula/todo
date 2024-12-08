import React, { useState, useContext } from "react"
import { useRouter } from 'next/router'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { DataContext } from "./customHooks/DataContext"

import styles from '../styles/TaskForm.module.css'


export default function FormP() {
    const { FetchData } = useContext(DataContext)
    const router = useRouter()
    const {task_id, task, category, priority, New} = router.query

    const [val, setVal] = useState({"task":task||"", "category":category||"", "priority":priority||"", "day":'', 'month':'', 'yr':'', 'hr':'', 'min':''})
    const [err, setErr] = useState("")
    const [success, setSuccess] = useState("")

    function handleChange(e){
        console.log("change")
        setVal({...val, [e.target.name]:e.target.value})
    }

    function validate(){
        if(val.task===""){
            return false
        }
        else{
            return true
        }
    }

    async function handleSubmit(e){
        e.preventDefault()

        if(validate()){
            let body = {}
            if(val.task!==""){
                body['task'] = val.task
            }
            if(val.category!==""){
                body['category'] = val.category
            }
            if(val.priority!==""){
                body['priority'] = val.priority
            }
            if(val.day!=="" && val.month!=="" && val.yr!=="" && val.hr!=="" && val.min!==""){
                let dueDate = `${val.day}/${val.month}/${val.yr}T${val.hr}:${val.min}`
                body['dueDate'] = dueDate
            }

            if(New==='true' && body){
                try {
                    let res = await fetch(`https://todo-backend-1-4u6w.onrender.com/api/db/tasks`, {
                        method: 'POST',
                        credentials: 'include',      //To include all cookies (jwt-tokens)......
                        body: JSON.stringify(body)
                    })
                    res = await res.json()

                    if(res.status==='success'){
                        setErr("")
                        setSuccess("New Task Created Successfully")
                    }
                    else{
                        setSuccess("")
                        setErr("Something went wrong, Please try again!")
                    }

                    setTimeout(async()=>{
                        await FetchData()
                        router.push('/')
                    }, 1000)
                }
                catch (e) {
                    console.log(e)
                    setErr("Something went wrong, Please try again!")
                }
            }

            else if(body){
                body['status']='pending'
                try {
                    let res = await fetch(`https://todo-backend-1-4u6w.onrender.com/api/db/tasks?id=${task_id}`, {
                        method: 'PATCH',
                        credentials: 'include',      //To include all cookies (jwt-tokens)......
                        body: JSON.stringify(body)
                    })
                    res = await res.json()

                    if(res.status==='success'){
                        setErr("")
                        setSuccess("Task Modified Successfully")
                    }
                    else{
                        setSuccess("")
                        setErr("Something went wrong, Please try again!")
                    }

                    setTimeout(async()=>{
                        await FetchData()
                        router.push('/')
                    }, 1000)
                }
                catch (e) {
                    console.log(e)
                    setErr("Something went wrong, Please try again!")
                }
            }
            
            else{
                setSuccess("")
                setErr("Please Modify the content First!")
            }
            console.log("submitted")
        }

        else{
            setSuccess("")
            setErr("'Task' is Required")
        }
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.form}>
                <div style={{color:'red'}}>
                    {
                        (err!=="")?err:""
                    }
                </div>
                <div style={{color:'green'}}>
                    {
                        (success!=="")?success:""
                    }
                </div>
                <div className={styles.head}>Create a New Task : </div>
                <Form>
                    <Row className="mb-8">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Task:<span style={{color:'red', fontSize:'1.3rem'}}>*</span></Form.Label>
                            <Form.Control autoFocus name="task" onChange={handleChange} value={val.task} type="text" placeholder="Input new task here.." />
                        </Form.Group>
                    </Row>

                    <Row className="mb-8">
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Category:</Form.Label>
                            <Form.Select name="category" onChange={handleChange} value={val.category} className={styles.date2}>
                                    <option>other</option>
                                    <option>personal</option>
                                    <option>work</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-8">
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Priority:</Form.Label>
                            <Form.Select name="priority" onChange={handleChange} value={val.priority} className={styles.date2}>
                                    <option>medium</option>
                                    <option>high</option>
                                    <option>low</option>
                                </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Due Date:</Form.Label>
                            <div className={styles.date}>
                                <Form.Select name="day" onChange={handleChange} value={val.day} className={styles.date1}>
                                    <option>Day...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>15</option>
                                    <option>16</option>
                                    <option>17</option>
                                    <option>18</option>
                                    <option>19</option>
                                    <option>20</option>
                                    <option>21</option>
                                    <option>22</option>
                                    <option>23</option>
                                    <option>24</option>
                                    <option>25</option>
                                    <option>26</option>
                                    <option>27</option>
                                    <option>28</option>
                                    <option>29</option>
                                    <option>30</option>
                                    <option>31</option>
                                </Form.Select>
                                <div className={styles.divide}>/</div>
                                <Form.Select name="month" onChange={handleChange} value={val.month} className={styles.date1}>
                                    <option>Month...</option>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </Form.Select>
                                <div className={styles.divide}>/</div>
                                <Form.Select name="yr" onChange={handleChange} value={val.yr} className={styles.date1}>
                                    <option>Year...</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                    <option>2026</option>
                                    <option>2027</option>
                                    <option>2028</option>
                                    <option>2029</option>
                                    <option>2030</option>
                                    <option>...</option>
                                </Form.Select>
                                <div className={styles.divide}>T</div>
                                <Form.Select name="hr" onChange={handleChange} value={val.hr} className={styles.date1}>
                                    <option>Hours...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>15</option>
                                    <option>16</option>
                                    <option>17</option>
                                    <option>18</option>
                                    <option>19</option>
                                    <option>20</option>
                                    <option>21</option>
                                    <option>22</option>
                                    <option>23</option>
                                    <option>24</option>
                                </Form.Select>
                                <div className={styles.divide}>:</div>
                                <Form.Select name="min" onChange={handleChange} value={val.min} className={styles.date1}>
                                    <option>Minutes...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>15</option>
                                    <option>16</option>
                                    <option>17</option>
                                    <option>18</option>
                                    <option>19</option>
                                    <option>20</option>
                                    <option>21</option>
                                    <option>22</option>
                                    <option>23</option>
                                    <option>24</option>
                                    <option>25</option>
                                    <option>26</option>
                                    <option>27</option>
                                    <option>28</option>
                                    <option>29</option>
                                    <option>30</option>
                                    <option>31</option>
                                    <option>32</option>
                                    <option>33</option>
                                    <option>34</option>
                                    <option>35</option>
                                    <option>36</option>
                                    <option>37</option>
                                    <option>38</option>
                                    <option>39</option>
                                    <option>40</option>
                                    <option>41</option>
                                    <option>42</option>
                                    <option>43</option>
                                    <option>44</option>
                                    <option>45</option>
                                    <option>46</option>
                                    <option>47</option>
                                    <option>48</option>
                                    <option>49</option>
                                    <option>50</option>
                                    <option>51</option>
                                    <option>52</option>
                                    <option>53</option>
                                    <option>54</option>
                                    <option>55</option>
                                    <option>56</option>
                                    <option>57</option>
                                    <option>58</option>
                                    <option>59</option>
                                    <option>60</option>
                                </Form.Select>
                            </div>
                        </Form.Group>
                    </Row>
                </Form>
                <button className={styles.btn} onClick={handleSubmit}>
                    {
                        (New==='true') ? "Create" : "Update"
                    }
                </button>
                </div>
            </div>
        </>
    )
}