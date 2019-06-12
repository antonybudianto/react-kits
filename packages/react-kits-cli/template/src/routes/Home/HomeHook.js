import React, { useState } from "react";

function HomeHook() {
    const [state, setState] = useState('world')
    return <div onClick={() => setState('hook')}>Halo, {state}</div>
}

export default HomeHook
