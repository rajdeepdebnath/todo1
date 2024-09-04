import React, { useState } from "react";

const Child = ({ count }: { count: number }) => {
  const [p, setP] = useState(count);

  console.log(`Child: count = ${count}, p = ${p}`);

  return <div>Child</div>;
};

export default React.memo(Child);
