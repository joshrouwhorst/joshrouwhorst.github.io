import qbp from 'qbp'
import { rand } from '../../scripts/website/utils'
import React, { useState } from 'react'
import MainTemplate from '../../components/templates/MainTemplate'

const NUM_OF_RECORDS = 10

class Record {
    Name
    Id
    Percent = 0

    constructor(label, id) {
        this.Name = `${label} ${(id + 1)}`
        this.Id = id
    }
}

function timeout(time) {
    return new Promise((res) => {
        setTimeout(() => res(), time)
    })
}

async function fakeProcess(item, { setStatus }) {
    item.Percent = 0
    while (item.Percent < 1) {
        const time = rand(1000, 3000)
        await timeout(time)
        const amount = rand(10, 40) / 100
        item.Percent += amount
        if (item.Percent > 1) item.Percent = 1
        console.log(`${item.Name}: ${item.Percent}`)
        setStatus({})
    }
}

function generateRecord(id, label) {
    if (!label) label = 'Record'
    return new Record(label, id)
}

function generateRecords(count, label) {
    const records = []

    for (let i = 0; i < count; i++) {
        records.push(generateRecord(i, label))
    }

    return records
}

const ProgressBar = ({ label, percent }) => {
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

const UpdateOutput = ({ title, value }) => {
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
    records: generateRecords(NUM_OF_RECORDS, 'Record'),
    output: () => {
        const records = example.records

        const outputRecord = (record, index) => {
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
                <div className="progressBar">
                    <ProgressBar label={'Total'} percent={example.percent}></ProgressBar>
                </div>
                <div className="records">
                    {outputRecords()}
                </div>
            </div>
        )
    },
    async run(progressUpdate) {
        example.status = 'Running'
        example.records.forEach(x => { x.Percent = 0 })
        progressUpdate()
        await qbp(example.records, (...args) => fakeProcess(...args), {
            progress: (...args) => progressUpdate(...args),
            threads: 10,
        })
    }
}

const QbpMain = () => {
    const [update, setUpdate] = useState(null)
    let progUpdateCount = 0

    const progressUpdate = (up) => {
        const newUpdate = up ? { ...up } : null
        progUpdateCount++

        if (up) {
            newUpdate.itemsPerSecond = Math.round(up.itemsPerSecond)
            newUpdate.secondsRemaining = newUpdate.secondsRemaining > 0 ? newUpdate.secondsRemaining : 0
        }

        let perc = 0
        example.records.forEach(x => { perc += x.Percent })
        example.percent = perc / example.records.length

        if (newUpdate && newUpdate.complete === newUpdate.total) {
            example.status = 'Complete'
        }

        if (newUpdate) setUpdate(newUpdate)
    }

    const run = async () => {
        await example.run(progressUpdate)
    }

    const updateOutputs = () => {
        if (!update) return null

        return (
            <div className="update-outputs">
                <div className="row">
                    <UpdateOutput title="Total" value={update.total}></UpdateOutput>
                    <UpdateOutput title="Completed" value={update.complete}></UpdateOutput>
                </div>

                <div className="row">
                    <UpdateOutput title="Queued" value={update.queued}></UpdateOutput>
                    <UpdateOutput title="Threads" value={update.threads}></UpdateOutput>
                </div>
            </div>
        )
    }

    return (
        <MainTemplate className="qbp-main">
            <h1>qbp Demo</h1>
            <div className="row mobile-reverse">
                <div className="col">
                    {example.output()}
                </div>
                <div className="col">
                    <div className="description">
                        <p>
                            This demonstration shows some of the information you get when processing lists through qbp. Click "Run" to start a fake process of dummy records. Every time there is a change to a record qbp sends an update on the progress of the queue.
                        </p>
                        <p>
                            For more information, see the <a href="https://www.npmjs.com/package/qbp">NPM page</a>.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button onClick={run}>Run</button>
                        </div>
                        <div className="col">
                            <div className="status">
                                {example.status}
                            </div>
                        </div>
                    </div>
                    {updateOutputs()}
                </div>
            </div>
        </MainTemplate>
    )
}

export default QbpMain