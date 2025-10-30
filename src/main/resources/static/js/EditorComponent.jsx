function Editor({name}){
    return (
        <div>
            <h1>Hello {name}</h1>
            <hr />
            <div id="toolstatus"></div>
            <hr />
            <div id="container">
                <BBCanvas/>
            </div>
            <hr />
            <div id="info"></div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Editor name="Daniel"/>
)