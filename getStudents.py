import json
import boto3

def lambda_handler(event, context):
    # Use the correct region
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table('studentData')

    data = []
    response = table.scan()
    data.extend(response.get('Items', []))

    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response.get('Items', []))

    return {
        'statusCode': 200,
        'body': json.dumps(data)
    }
