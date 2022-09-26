import * as React from "react"
import MainTemplate from "../components/MainTemplate"
import josh from "../images/josh.webp"

const IndexPage = () => {
    return (
        <MainTemplate className="about-me">
            <img src={josh} className="josh-img" />
            <h2>
                About Me
            </h2>
            <p>
                I'm baby migas selvage yes plz chillwave williamsburg. Keytar twee typewriter, selfies vinyl brunch taxidermy tote bag venmo man bun four loko photo booth DIY kitsch yr.
            </p>
            <p>
                Heirloom edison bulb austin hell of. Art party schlitz aesthetic lo-fi wolf. Migas mixtape DSA poutine skateboard kitsch chillwave narwhal wolf. Stumptown literally asymmetrical, humblebrag man braid kogi kale chips artisan.
            </p>
            <p>
                Small batch selvage messenger bag, yes plz forage edison bulb disrupt letterpress wolf.
            </p>
            <p>
                Typewriter salvia food truck migas trust fund blog roof party locavore cliche helvetica jianbing. Direct trade umami chicharrones pork belly next level kickstarter celiac intelligentsia humblebrag 8-bit ugh typewriter. Irony glossier four loko, snackwave venmo 8-bit art party meditation skateboard retro deep v blog. Aesthetic truffaut trust fund woke before they sold out distillery. Unicorn venmo yr iceland banjo palo santo.
            </p>
            <p>
                Content: LinkedIn link, resume stuff (no personal identification).
            </p>
        </MainTemplate>
    )
}

export default IndexPage