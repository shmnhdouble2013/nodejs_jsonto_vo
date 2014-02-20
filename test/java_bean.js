
// 转换 json
"{
    father: {
        whife: {
            sex: 'boy',
            age: 18,
            brother: {
                fd: {
                    name: 'fds',
                    age: 12
                },
                name: 'son',
                mathor: 'mama'
            }
        },
        sex='woman'
    },
	
    isOk: true,
    age: 1,
    score: 2.2,
	
    frieds: [
        {
            name: 'value',
            age: 18
        },
        {
            name: 'value',
            age: 18
        },
        2
    ],
	
    teacher: {
        childress: {
            sex: 'boy',
            age: 18,
            son: {
                fd: {
                    name: 'fds',
                    age: 12
                },
                name: 'son',
                mathor: 'mama'
            }
        },
        sex='woman'
    }
}"






// public class RootJavaBean 就是一个 java类，RootJavaBean 是vo类名
public class RootJavaBean{
	private boolean isOk;  // 里面所有的变量 都是私有的，故而 private
	private Number age;
	private double score;
	private Collection<Frieds> friedsCollection;
	private Father father;

	class Father{
		private String sex;
		private Whife whife;

		class Whife{
			private String sex;
			private Number age;
			private Brother brother;

			class Brother{
				private String name;
				private String mathor;
				private Fd fd;

				class Fd{
					private String name;
					private Number age;
				}
			}
		}
	}
	
	private Frieds frieds;

	class Frieds{
		private String name;
		private Number age;
	}
	private Teacher teacher;

	class Teacher{
		private String sex;
		private Childress childress;

		class Childress{
			private String sex;
			private Number age;
			private Son son;

			class Son{
				private String name;
				private String mathor;
				private Fd fd;

				class Fd{
					private String name;
					private Number age;
				}
			}
		}
	}
}