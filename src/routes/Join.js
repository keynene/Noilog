import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Join(){
	return (
		<div>
			<div className="join_img_form">
				<div className='join_img'>
					<div className="join-bg">
						{/* 이미지는 css파일 옵션 */}
						<h2>회원가입</h2>
					</div>
				</div>
			</div>
			<div className='join_inner'>
				<div className='inner'>
					<form>
						<p className='welcome'>Noven에 어서왕!</p>
						<div className="join_wrap">
							<div className='join_title_area'>
								<h2 className='title2'>회원가입</h2>
							</div>
							<div className="form_wrap">
								{/* id form */}
								<div className="form_group form_id">
									<div className="title">{'아아디(ID)'}</div>
								</div>
								<div className='cont'>
									<div className='input_box'>
										<input type="text" placeholder='예) 농노이 (본인 실명을 띄어쓰기 없이 입력해주세요)' />
									</div>
								</div>





								{/* <Form>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Email address</Form.Label>
										<Form.Control type="email" placeholder="Enter email" />
										<Form.Text className="text-muted">
											We'll never share your email with anyone else.
										</Form.Text>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control type="password" placeholder="Password" />
									</Form.Group>
									<Form.Group className="mb-3" controlId="formBasicCheckbox">
										<Form.Check type="checkbox" label="Check me out" />
									</Form.Group>
									<Button variant="primary" type="submit">
										Submit
									</Button>
								</Form> */}
							
								
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}


export default Join;