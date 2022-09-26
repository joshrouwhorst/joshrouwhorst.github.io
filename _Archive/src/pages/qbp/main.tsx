import qbp from 'qbp'
import { rand } from '../../scripts/website/utils'
import React, { useState } from 'react'
import MainTemplate from '../../components/MainTemplate'

class Record {
    Name: string
    Id: number
    Percent: number = 0

    constructor(label: string, id: number) {
        this.Name = `${label} ${(id + 1)}`
        this.Id = id
    }
}

function timeout(time: number) {
    return new Promise((res: Function) => {
        setTimeout(() => res(), time)
    })
}

async function fakeProcess(item: Record, { setStatus }: any) {
    item.Percent = 0
    while (item.Percent < 1) {
        const time = rand(1000, 3000)
        await timeout(time)
        const amount = rand(0, 50) / 100
        item.Percent += amount
        if (item.Percent > 1) item.Percent = 1
        console.log(`${item.Name}: ${item.Percent}`)
        setStatus({})
    }
}

function generateRecord(id: number, label: string) {
    if (!label) label = 'Record'
    return new Record(label, id)
}

function generateRecords(count: number, label: string) {
    const records = []

    for (let i = 0; i < count; i++) {
        records.push(generateRecord(i, label))
    }

    return records
}

const ProgressBar = ({ label, percent }: any) => {
    let cls = ''

    if (percent === 0) cls = 'not-started'
    else if (percent >= 1) cls = 'complete'
    else cls = 'in-process'

    const classes = `progress-bar ${cls}`

    label = `${label}: ${Math.round(percent * 100)}%`

    return (
        <div className={classes}>
            <div className="empty-bar">
                <div className="text">{label}</div>
            </div>

            <div className="full-bar" style={{ clipPath: `polygon(0 100%, 0 0, ${(percent * 100)}% 0, ${(percent * 100)}% 100%)` }}>
                <div className="text">{label}</div>
            </div>
        </div>
    )
}

const UpdateOutput = ({ title, value }: any) => {
    return (
        <div className="col update-output">
            <div className="title">
                {title}
            </div>
            <div className="value">
                {value}
            </div>
        </div>
    )
}

const example = {
    percent: 0,
    status: 'Ready',
    records: generateRecords(15, 'Test'),
    output: () => {
        const records = example.records

        const outputRecord = (record: Record, index: number) => {
            return (
                <div className="record" key={index}>
                    <ProgressBar label={record.Name} percent={record.Percent}></ProgressBar>
                </div>
            )
        }

        const outputRecords = () => {
            let recs = []
            for (let i = 0; i < records.length; i++) {
                recs.push(outputRecord(records[i], i))
            }
            return recs
        }

        return (
            <div className="example">
                <div className="records">
                    {outputRecords()}
                </div>
                <div className="progressBar">
                    <ProgressBar label={'Total'} percent={example.percent}></ProgressBar>
                </div>
                <div className="status">
                    {example.status}
                </div>
            </div>
        )
    },
    async run(progressUpdate: Function) {
        example.status = 'Running'
        example.records.forEach(x => { x.Percent = 0 })
        progressUpdate()
        await qbp(example.records, (...args: any) => fakeProcess(...args), {
            progress: (...args: any) => progressUpdate(...args)
        })
        example.status = 'Complete'
        progressUpdate()
    }
}

const Main = () => {
    const [update, setUpdate] = useState(null)
    let ips = 0
    let progUpdateCount = 0

    const progressUpdate = (up: any) => {
        const newUpdate = up ? { ...up } : null
        progUpdateCount++

        if (up) {
            newUpdate.itemsPerSecond = Math.round(up.itemsPerSecond)
            newUpdate.secondsRemaining = newUpdate.secondsRemaining > 0 ? newUpdate.secondsRemaining : 0
        }

        let perc = 0
        example.records.forEach(x => { perc += x.Percent })
        example.percent = perc / example.records.length

        if (newUpdate) setUpdate(newUpdate)
    }

    const run = async () => {
        console.log('Start Run')
        await example.run(progressUpdate)
        console.log('End Run')
    }

    const updateOutputs = () => {
        if (!update) return null
        console.log('Outputing')

        return (
            <div className="update-outputs">
                <div className="row">
                    <UpdateOutput title="Total Items" value={update.total}></UpdateOutput>
                    <UpdateOutput title="Completed Items" value={update.complete}></UpdateOutput>
                </div>

                <div className="row">
                    <UpdateOutput title="Queued Items" value={update.queued}></UpdateOutput>
                    <UpdateOutput title="Threads" value={update.threads}></UpdateOutput>
                </div>

                <div className="row">
                    <UpdateOutput title="Items Per Second" value={update.itemsPerSecond}></UpdateOutput>
                    <UpdateOutput title="Seconds Remaining" value={update.secondsRemaining}></UpdateOutput>
                </div>
            </div>
        )
    }

    return (
        <MainTemplate className="qbp-main">
            <h2>Examples</h2>
            <div className="row">
                <div className="col">
                    {example.output()}
                </div>
                <div className="col">
                    <div className="description">
                        Couple hardest insignia snapshots familiar langham onto lacy pictures buzzing offered solitude? Dumped honker return hooves taffy stubbing five stubble henry my instinctively! Hopes frantically sister steady shook premonitions?
                    </div>
                    <div>
                        <button onClick={run}>Run</button>
                    </div>
                    {updateOutputs()}
                </div>
            </div>
        </MainTemplate>
    )
}

export default Main