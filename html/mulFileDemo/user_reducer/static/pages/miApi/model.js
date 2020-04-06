const model={
    reducer:(defaultState = {
        name: '',
        status: '2',
        Alldate: [],
        total: 0,
    },action)=>{
        switch(action.type) {
            case 'COM_ALLDATA' :
                const Alldate =M.global.maplist(action.dataAll);
                const total = action.total;
                return Object.assign({}, defaultState, {
                    Alldate: Alldate,
                    total: total
                });
        }
        return defaultState;
    },
    action:(dispatch)=> {
        return {
            Alldatas: (page) => {
                M.IO.miApiListByPage(page).then((d)=>{
                    dispatch({
                        type: "COM_ALLDATA",
                        dataAll:d.rows,
                        total: d.total
                    });

                })
            }
        }
    }
};

const store= Redux.createStore(
    model.reducer
);
