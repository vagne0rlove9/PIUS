import React, { useEffect } from 'react';
import './Operator.css'

function Operator(props) {

    useEffect(() => {
        const onKeypress = e => console.log(e);

        document.addEventListener('keypress', onKeypress);

        return () => {
            document.removeEventListener('keypress', onKeypress);
        };
    }, []);

    const [workMode, setWorkMode] = React.useState("auto");
    const [curX, setCurX] = React.useState("0");
    const [curY, setCurY] = React.useState("0");
    const [curZ, setCurZ] = React.useState("0");

    const handleChangeMode = (event) => {
        setWorkMode(event.target.value)
    }

    const handleChangeCurX = (event) => {
        setCurX(event.target.value)
    }

    const handleChangeCurY = (event) => {
        setCurY(event.target.value)
    }

    const handleChangeCurZ = (event) => {
        setCurZ(event.target.value)
    }

    return (
        <div className="container-form">
            <div className="container-center">
                <div>
                    <label>XMAX</label>
                    <input className="container-form-input" placeholder="Введите XMAX от 1 до 10" />
                </div>
                <div>
                    <label>YMAX</label>
                    <input className="container-form-input" placeholder="Введите YMAX от 1 до 10" />
                </div>
                <div>
                    <label>ZMAX</label>
                    <input className="container-form-input" placeholder="Введите ZMAX от 1 до 3" />
                </div>
                <div>
                    <label>TZAD</label>
                    <input className="container-form-input" placeholder="Введите задержку между итерациями от 300 до 5000" />
                </div>
                <div className="container-current">
                    <label>XCUR</label>
                    <input className="input-current-coors" value={curX} onChange={handleChangeCurX} />
                </div>
                <div>
                    <label>YCUR</label>
                    <input className="input-current-coors" value={curY} onChange={handleChangeCurY}/>
                </div>
                <div>
                    <label>ZCUR</label>
                    <input className="input-current-coors" value={curZ} onChange={handleChangeCurZ}/>
                </div>
                <div className="container-current">
                    <div>
                        <label>Режим работы</label>
                        <select className="input-current-coors" value={workMode} onChange={handleChangeMode}>
                            <option value="auto">Автоматический</option>
                            <option value="manual">Ручной</option>
                        </select>
                        {
                            workMode === "manual"
                                ? <button className="button-step">Сделать шаг</button>
                                : null
                        }
                    </div>
                </div>
                <div className="container-buttons">
                    <button>Начать процесс</button>
                    <button>Стоп процесс</button>
                    <button>Конец процесс</button>
                </div>
                <div className="container-commands">
                    Клавиши для управления:<br />
                    А - автоформат<br />
                    Р - ручной<br />
                    Н - настройка<br />
                    П - пуск<br />
                    Ш - шаг<br />
                    С - стоп<br />
                    К - конец работы<br />
                </div>
            </div>
        </div>
    );
}

export default Operator;
