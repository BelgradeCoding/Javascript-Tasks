var assigment = [
  `
    var $a_λN = $num;
    var $b_λN = $num;
    var $c_λN = $num;
    var $rnd_λN = $num;
    var $rnd_λF = (function (){
        $rdc_λN = $num;
        $rdc_$b = $num;
        console.log("$a", $a, "$c", $c);
        var $rnd_V = $g()[0]();
        $rdc_λN = $num;
        var $rnd_λN = $num;
        console.log("$a", $a, "$b", $b);
        function $g_λF() {
            $rdc_$a = $num;
            $rdc_$b = $num;
            console.log("$a", $a, "$b", $b);
            return [function(){
                $rdc_$a = $num;
                $rdc_$b = $num;
                console.log("$a", $a, "$b", $b);
            }]
        }
        return $g_λF();
    })();
     `, 
  `
   var $a_λS = "str";
   var $b_λN = $num;
   console.log($a + $b)
   function $c_λF(){
       var $a = $num;
       var $rnd_λN = $num;
   }
   $c;
   `,
  `
  var $a_λO = {
    $b_λNK:$num,
    $c_λNK:$num,
    $g_λO:{
        $rnd_λNK:$num,
        $h_λFK:function(){
        $a.$b = $num;
        return $a.$b * 2
           }
         }         
      }
      
      
      console.log("$a.$b",$a.$b,"$a.$g",$a.$g.$h)
   `,
   `var $a = [$num,$num,$num]
        $a.push($num,$num);
        var $b = $num;
        function $d_λF(){
            $rdc_$b = $a[3];
        }
        $d();
        var $c_λN = $num;
        $rnd_V = $num;
        var $g = $b + $used_V;
        console.log("$g",$g);
        console.log("$b * $c",$b * $c)
   `
];
