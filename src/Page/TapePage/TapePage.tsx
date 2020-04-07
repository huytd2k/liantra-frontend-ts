import React, { useState, useEffect, useContext, MouseEvent } from 'react'
import { Form, FormGroup, Container, Button, Alert } from 'react-bootstrap'
import { TapeContext } from '../../Context/TapeContext'
import { fetchAllTape } from '../../API/TapeAPI'
import TapeContainer from '../../Component/TapeContainer'
export default function TapePage() {
    const [showAlert, setShowAlert] = useState(false)
    const [level, setLevel] = useState("")
    const [title, setTitle] = useState("")
    const [ytUrl, setYtUrl] = useState("")
    const [description, setDescription] = useState("")
    const [script, setScript] = useState("")
    const [resStatus, setResStatus] = useState(false)
    const { tapeList, setTapeList } = useContext(TapeContext);

    async function handleSubmit(e: React.MouseEvent) {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/tape", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    "title": title,
                    "level": level,
                    "ytUrl": ytUrl,
                    "description": description,
                    "script": script
                })
            })
            setResStatus(response.status == 200 ? true : false)
            setShowAlert(!showAlert);
            setLevel("");
            setScript("");
            setTitle("");
            setYtUrl("");
            setDescription("");
        } catch (err) {
            console.log(err)
        }
    }

    const handleGetPost = (e: React.MouseEvent) => {
        e.preventDefault()


    }
    useEffect(() => {
        fetchAllTape(setTapeList);
    }, [setTapeList])




    return (
        <div className="TapePage">
            <Container>
                <Form>
                    {showAlert && <Alert variant={resStatus ? "success" : "warning"}>
                        Some Alert
                    </Alert>}
                    <TapeContainer tapes={tapeList}/>
                    <FormGroup>
                        <Form.Control value={level} placeholder="level" onChange={(e : React.ChangeEvent<HTMLSelectElement>) => { setLevel(e.target.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Form.Control value={title} placeholder="title" onChange={(e : React.ChangeEvent<HTMLSelectElement>) => { setTitle(e.target.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Form.Control value={ytUrl} placeholder="youtube link" onChange={(e : React.ChangeEvent<HTMLSelectElement>) => { setYtUrl(e.target.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Form.Control value={description} placeholder="description" onChange={(e : React.ChangeEvent<HTMLSelectElement>) => { setDescription(e.target.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Form.Control value={script} placeholder="script" as="textarea" onChange={(e : React.ChangeEvent<HTMLSelectElement>) => { setScript(e.target.value) }} />
                    </FormGroup>
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    <Button type="submit" onClick={handleGetPost}>Get Tapes</Button>
                </Form>
            </Container>
        </div>
    )
}

