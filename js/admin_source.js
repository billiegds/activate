
window.addEventListener('load', function () {

    var CSRF_TOKEN = '{{ csrf_token }}';
    let progbars = Array.from(document.getElementsByClassName("prog-bar"));
    let intervals = {};

    const updateProgressBar = (srcId, element)=>{
       async function getProgress(srcId) {
            await fetch(`/api/checkaddsourceprogress?srcId=${srcId}`,
                {
                    "method": "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "X-CSRFToken": CSRF_TOKEN,
                    }
                }
            )
            .then((response) => response.json())
            .then((json) => {
                let frac = json.progress.split('/')
                let prog = Math.floor((parseFloat(frac[0]) / parseFloat(frac[1])) * 100)
                let prog_percent = String(prog) + '%'
                element.style.width = prog_percent
                const progBarTxt = document.getElementById(`prog-bar-txt-${srcId}`)
                progBarTxt.innerText = json.progress
                    //console.log(prog_percent)

                    //if(prog_percent === "100%"){
                        //for(let key in intervals) {
                            //if(intervals[key]["id"] === srcId){
                                //intervals[key]["status"] = "end"
                                //delete intervals[key]
                                //clearInterval(key)
                            //}
                        //}
                        ////console.log(intervals)
                    //}
                //console.log(json)
            })
       }
       getProgress(srcId);
    }

    if (progbars.length > 0) {
        progbars.forEach((item)=>{
            //if status is new, setInterval for updateProgressBar
            const tr = item.parentElement.parentElement
            const status = tr.getElementsByClassName("field-status")[0].innerText
            //console.log(status)
            if(status!='processed' && status!='updated'
            ) {
                let srcId = item.id.split('-');
                srcId = srcId[srcId.length-1];
                const handle = setInterval(updateProgressBar, 1000, srcId, item);
                intervals[handle] = {"id": srcId, "status": "start"}
                //console.log(intervals)
            }
        })
    }

    try {
        const type_select = document.getElementById("id_type");
        //const file_ = document.getElementById("id_file")
        //const url_ = document.getElementById("id_url")
        const file_ = document.getElementsByClassName("field-file")[0].parentElement;
        let url_ = document.getElementsByClassName("field-url")[0].parentElement;
        //url_.style.display = 'none';
        //file_.style.display = 'inline';


        if (type_select.value === 'www'){
            url_.style.display = 'inline';
            file_.style.display = 'none';
        }
        else if (type_select.value === 'file'){
            url_.style.display = 'none';
            file_.style.display = 'inline';

        }

        type_select.addEventListener('change', (e) => {
            //add logic here to display textbox or file
            if (type_select.value === 'www'){
                url_.style.display = 'inline';
                file_.style.display = 'none';
            }
            else if (type_select.value === 'file'){
                url_.style.display = 'none';
                file_.style.display = 'inline';

            }

        })
    }
    catch (e) {
        console.log(e);
    }

})


