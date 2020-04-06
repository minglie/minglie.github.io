const MingWebView=(props)=> {
    return (
            <div  style={{width:'100%',height:'100%'}}>
                <a href={props.src}>{props.src}</a><hr/><hr/>
                <iframe
                    style={{width:'100%',border:'0px',height:'100%'}}
                    sandbox="allow-scripts allow-forms allow-same-origin"
                    // scrolling="auto"
                    src={props.src}
                />
            </div>
        );
}
