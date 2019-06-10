import React, { useState } from "react";

function HomeHook() {
    const [state, setState] = useState('jono')
    return <div>Halo, {state}</div>
}

export default HomeHook
