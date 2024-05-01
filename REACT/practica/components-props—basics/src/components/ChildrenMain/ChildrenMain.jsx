import "./ChildrenMain.css"

export const ChildrenMain = ({suma=2+2 , resta=20-10 }) => {

    return <div>
                <p>{suma}</p>
                <p>{resta}</p>
            </div>
};